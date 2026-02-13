export const fetchTranscript = async (youtubeUrl: string): Promise<string> => {
  console.log(`Fetching transcript for YouTube URL: ${youtubeUrl}`);
  
  const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
  
  if (!webhookUrl) {
    throw new Error('VITE_MAKE_WEBHOOK_URL is not configured in environment variables');
  }
  
  console.log(`Using webhook URL: ${webhookUrl}`);
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: youtubeUrl })
    });
    
    console.log(`Webhook response status: ${response.status}`);
  
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to fetch transcript');
    }
    
    const data = await response.text();
    console.log('Webhook response data length:', data.length);
    console.log('First 200 characters of response:', data.substring(0, 200));
    
    if (!data) {
      throw new Error('No transcript found in response');
    }
    
    return data.trim();
  } catch (error) {
    console.warn('Webhook failed, attempting direct YouTube transcript extraction...');
    
    // Try to get transcript directly from YouTube as fallback
    try {
      const transcript = await getYouTubeTranscriptDirect(youtubeUrl);
      if (transcript) {
        console.log('Successfully extracted transcript directly from YouTube');
        return transcript;
      }
    } catch (directError) {
      console.warn('Direct transcript extraction also failed:', directError);
    }
    
    throw error;
  }
};

// Direct YouTube transcript extraction fallback
const getYouTubeTranscriptDirect = async (youtubeUrl: string): Promise<string | null> => {
  try {
    // Extract video ID from URL
    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      throw new Error('Could not extract video ID from URL');
    }
    
    console.log(`Extracted video ID: ${videoId}`);
    
    // Try to fetch transcript using YouTube's transcript API endpoint
    const transcriptUrl = `https://www.youtube.com/api/timedtext?lang=en&v=${videoId}`;
    
    const response = await fetch(transcriptUrl);
    
    if (!response.ok) {
      // Try alternative transcript endpoint
      const altUrl = `https://www.youtube.com/api/timedtext?lang=en&v=${videoId}&fmt=srv3`;
      const altResponse = await fetch(altUrl);
      
      if (!altResponse.ok) {
        throw new Error('No transcript available for this video');
      }
      
      const xmlData = await altResponse.text();
      return parseTranscriptXML(xmlData);
    }
    
    const xmlData = await response.text();
    return parseTranscriptXML(xmlData);
    
  } catch (error) {
    console.warn('Direct transcript extraction failed:', error);
    return null;
  }
};

// Extract video ID from various YouTube URL formats
const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

// Fetch video details using YouTube oEmbed API
export const fetchVideoDetails = async (youtubeUrl: string): Promise<{
  title: string;
  author_name: string;
  thumbnail_url: string;
} | null> => {
  try {
    const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(youtubeUrl)}&format=json`;
    
    console.log(`Fetching video details from: ${oEmbedUrl}`);
    
    const response = await fetch(oEmbedUrl);
    
    if (!response.ok) {
      throw new Error(`oEmbed API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('Video details fetched:', {
      title: data.title,
      author_name: data.author_name,
      thumbnail_url: data.thumbnail_url
    });
    
    return {
      title: data.title || 'Unknown Title',
      author_name: data.author_name || 'Unknown Channel',
      thumbnail_url: data.thumbnail_url || ''
    };
    
  } catch (error) {
    console.warn('Failed to fetch video details:', error);
    return null;
  }
};

// Parse YouTube's XML transcript format
const parseTranscriptXML = (xmlData: string): string => {
  try {
    // Remove XML tags and decode HTML entities
    const textContent = xmlData
      .replace(/<[^>]*>/g, ' ') // Remove XML tags
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    if (!textContent || textContent.length < 50) {
      throw new Error('Transcript too short or empty');
    }
    
    return textContent;
  } catch (error) {
    throw new Error('Failed to parse transcript XML');
  }
};
export const runOpenRouterStep = async (stepId: string, data: any): Promise<any> => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  
  const systemPrompt = getSystemPromptForStep(stepId);
  
  try {
    console.log(`Running OpenRouter step ${stepId}...`);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'youtubeleads',
        'X-Title': 'YouTube to Leads',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-lite-001',
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: JSON.stringify(data)
          }
        ]
      })
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    const responseData = await response.json();
    let content = responseData.choices[0].message.content;

    // Log raw content for debugging all steps
    console.log(`Raw API Response (${stepId}):`, content);

    try {
      // First attempt: direct JSON parse
      return JSON.parse(content);
    } catch (parseError) {
      console.warn(`Initial JSON parse failed for ${stepId}, attempting to sanitize content...`);
      console.log('Parse error:', parseError);
      
      // Enhanced sanitization - extract JSON from potential markdown blocks
      let sanitizedContent = content.trim();
      
      // Remove markdown code blocks if present
      if (sanitizedContent.includes('```json')) {
        const jsonStart = sanitizedContent.indexOf('```json') + 7;
        const jsonEnd = sanitizedContent.indexOf('```', jsonStart);
        if (jsonEnd !== -1) {
          sanitizedContent = sanitizedContent.substring(jsonStart, jsonEnd).trim();
        }
      } else if (sanitizedContent.includes('```')) {
        const jsonStart = sanitizedContent.indexOf('```') + 3;
        const jsonEnd = sanitizedContent.indexOf('```', jsonStart);
        if (jsonEnd !== -1) {
          sanitizedContent = sanitizedContent.substring(jsonStart, jsonEnd).trim();
        }
      }
      
      // Remove control characters but don't escape quotes/backslashes
      sanitizedContent = sanitizedContent.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

      // Remove any non-JSON content before the first {
      sanitizedContent = sanitizedContent.substring(sanitizedContent.indexOf('{'));
      
      // Remove any content after the last }
      const lastBrace = sanitizedContent.lastIndexOf('}');
      if (lastBrace !== -1) {
        sanitizedContent = sanitizedContent.substring(0, lastBrace + 1);
      }

      // Check if we found any JSON structure at all
      if (sanitizedContent.indexOf('{') === -1) {
        console.error(`No JSON structure found in API response for ${stepId}`);
        console.log('Original content:', content);
        throw new Error(`API returned non-JSON content for step ${stepId}`);
      }

      // Log sanitized content for debugging
      console.log(`Sanitized Content (${stepId}):`, sanitizedContent);

      // Validate JSON structure before parsing
      if (!/^{.*}$/.test(sanitizedContent)) {
        console.error(`Invalid JSON structure after sanitization for ${stepId}:`, sanitizedContent);
        throw new Error(`Invalid JSON structure after sanitization for step ${stepId}`);
      }
      
      try {
        return JSON.parse(sanitizedContent);
      } catch (secondParseError) {
        console.error(`Second JSON parse failed for ${stepId}:`, secondParseError);
        console.log('Final sanitized content:', sanitizedContent);
        throw new Error(`Unable to parse JSON response for step ${stepId}: ${secondParseError.message}`);
      }
    }
  } catch (error) {
    console.error(`Error in OpenRouter step ${stepId}:`, error);
    throw error;
  }
};

const getSystemPromptForStep = (stepId: string): string => {
  switch (stepId) {
    case 'YT2':
      return `You are a knowledge extraction expert. You will receive a YouTube video transcript and your job is to extract the key points and concepts. Filter out promotional content, sign-up requests, membership offers, and any irrelevant material. Focus on the core educational content. Summarize in 7 or fewer bullet points and identify the main concepts discussed. The summary should capture the most valuable insights that could be expanded into a lead magnet. Output format:
      { "summary_bullets": ["Bullet 1", "Bullet 2", ...], "concepts": ["Concept 1", "Concept 2", ...] }`;
      
    case 'YT3':
      return `You are a persona identification expert. Based on the concepts and key points provided, identify the likely viewer personas and their pain points. Each persona should have a name, brief description, and list of pain points that directly relate to the video's content. These personas will be used to create targeted marketing materials. Output format:
      { "personas": [{"id": "persona1", "name": "Marketing Manager Mary", "description": "...", "pains": ["Pain 1", "Pain 2", ...]}] }`;
      
    case 'YT4':
      return `You are a quiz creation expert. Based on the concepts and key points provided, create 10 question/answer pairs at three different difficulty levels (beginner, intermediate, advanced). The questions should test knowledge specifically from the video's content and help reinforce the key learning points. These questions will be used in the lead magnet and email sequence. Output format:
      { "quiz": [{"q": "Question text", "a": "Answer text", "level": "beginner|intermediate|advanced"}, ...] }`;

    case 'YT5':
      return `You are a lead magnet creation expert. Using the key points, concepts, and personas identified, create an outline for a comprehensive lead magnet. The lead magnet should directly address the pain points identified and expand on the video's core teachings. Include compelling section titles and brief content descriptions. Output format:
      { "lm_title": "Title", "lm_sections": [{"title": "Section Title", "content": "Description"}], "pullquotes": ["Quote 1", "Quote 2"] }`;

    case 'YT6':
      return `You are a landing page copywriting expert. Using the lead magnet outline and persona information, create compelling landing page copy that will convince viewers to download the lead magnet. Focus on the specific value propositions and pain points identified. Output format:
      { "lp_copy": {"h1": "Headline", "sub": "Subheadline", "bullets": ["Benefit 1"], "cta": "Button Text", "faq": [{"question": "Q1", "answer": "A1"}]} }`;

    case 'YT7':
      return `You are a landing page design expert. Based on the landing page copy and lead magnet content, create a detailed design brief that will help visualize the landing page. Consider the target personas and ensure the design supports the copy's persuasive elements. Output format:
      { "lp_brief": { "layout": "Layout description", "typography": { "headings": "Font details", "body": "Font details" }, "colors": ["Primary", "Secondary"], "sections": [{ "name": "Section name", "design": "Design details" }] } }`;
      
    case 'YT8':
      return `You are a social media expert. Using the key points and lead magnet content, create platform-specific posts that tease the valuable insights from the video and lead magnet. Each post should demonstrate expertise while naturally leading to interest in the full content. Output format:
      { "social_posts": [{"platform": "platform_name", "content": "post content"}, ...] }`;
      
    case 'YT9':
      return `You are an SEO content expert. Using all the previously generated content, create a comprehensive article that covers the main educational topics from the video. Incorporate the key points, personas' pain points, and selected quiz questions to create an authoritative piece that naturally leads to interest in the lead magnet. 
      
      CRITICAL: The seo_article_md field must be a properly JSON-escaped string. All double quotes (") within the markdown content must be escaped as (\"), all newlines must be escaped as (\\n), and all backslashes must be escaped as (\\\\). The entire markdown content must be on a single line with proper JSON escaping.
      
      Output format:
      { "seo_article_md": "properly escaped markdown content with \\n for newlines and \\" for quotes", "h2s": ["heading 1", "heading 2", ...] }`;

    case 'YT10':
      return `You are a visual design expert. Based on the key concepts and lead magnet content, create a detailed prompt for a hero image that will be used across the landing page and social media. The image should visually represent the transformation or value proposition discussed in the video. Output format:
      { "hero_prompt": "Detailed image generation prompt" }`;

    case 'YT11':
      return `You are an infographic design expert. Using the quiz questions and key statistics from the content, create a design brief for an infographic that will visualize the most compelling data points and insights from the video and lead magnet. Output format:
      { "infographic_prompt": "Detailed infographic design prompt" }`;

    case 'YT12':
      return `You are an email marketing expert. Using the lead magnet content and quiz questions, create a welcoming and engaging first email that will be sent to new subscribers. Include a mix of immediate value and anticipation for the full lead magnet. Write the email in plain text format with proper spacing and formatting that can be easily copied. Output format:
      { "welcome_email": { "subject": "Welcome Subject", "body": "Email body content with proper line breaks and spacing" } }`;

    case 'YT13':
      return `You are an email sequence strategist. Based on the lead magnet content and personas, create a series of follow-up emails that will nurture subscribers and demonstrate the value of implementing the video's teachings. Each email should build upon the previous ones. Output format:
      { "drip_emails": [{"subject": "Subject", "day_after_signup": 1, "body": "Email content"}] }`;
      
    default:
      return `Process the input data for step ${stepId} and return structured information.`;
  }
};
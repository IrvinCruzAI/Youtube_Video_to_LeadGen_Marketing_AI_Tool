import React, { useState } from 'react';
import { Copy, Check, ChevronDown, Menu } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Job } from '../types';

interface ResultsPanelProps {
  job: Job;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ job }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Set default tab to transcript when job has results
  React.useEffect(() => {
    if (job.results.length > 0 && activeTab === 'summary') {
      const hasTranscript = job.results.find(r => r.type === 'YT1');
      if (hasTranscript) {
        setActiveTab('transcript');
      }
    }
  }, [job.results.length]);
  
  const handleCopy = (content: string, key: string) => {
    navigator.clipboard.writeText(content);
    
    setCopiedStates({ ...copiedStates, [key]: true });
    
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [key]: false });
    }, 2000);
  };

  const tabs = [
    { id: 'transcript', label: 'Transcript', available: job.results.find(r => r.type === 'YT1') },
    { id: 'summary', label: 'Summary', available: job.results.find(r => r.type === 'YT2' || r.type === 'YT3') },
    { id: 'quiz', label: 'Quiz', available: job.results.find(r => r.type === 'YT4') },
    { id: 'leadMagnet', label: 'Lead Magnet', available: job.results.find(r => r.type === 'YT5') },
    { id: 'landingPage', label: 'Landing Page', available: job.results.find(r => r.type === 'YT6' || r.type === 'YT7') },
    { id: 'social', label: 'Social', available: job.results.find(r => r.type === 'YT8' || r.type === 'YT10') },
    { id: 'email', label: 'Email', available: job.results.find(r => r.type === 'YT12' || r.type === 'YT13') },
    { id: 'seo', label: 'SEO', available: job.results.find(r => r.type === 'YT9') },
    { id: 'infographic', label: 'Infographic', available: job.results.find(r => r.type === 'YT11') }
  ];

  const availableTabs = tabs.filter(tab => tab.available);
  const activeTabLabel = tabs.find(tab => tab.id === activeTab)?.label || 'Results';

  const renderSummary = () => {
    const knowledge = job.results.find(r => r.type === 'YT2')?.data;
    const personas = job.results.find(r => r.type === 'YT3')?.data;
    
    if (!knowledge && !personas) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Summary not available yet...
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        {knowledge && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3">Key Takeaways</h3>
            <ul className="list-disc pl-5 space-y-2">
              {knowledge.summary_bullets?.map((bullet: string, idx: number) => (
                <li key={idx} className="text-gray-700 dark:text-gray-300">{bullet}</li>
              ))}
            </ul>
          </div>
        )}
        
        {knowledge && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3">Key Concepts</h3>
            <div className="flex flex-wrap gap-2">
              {knowledge.concepts?.map((concept: string, idx: number) => (
                <span key={idx} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {personas && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3">Target Personas</h3>
            {personas.personas?.map((persona: any, idx: number) => (
              <div key={idx} className="mb-4 last:mb-0">
                <h4 className="font-medium">{persona.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{persona.description}</p>
                <h5 className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-1">Pain Points:</h5>
                <ul className="list-disc pl-5 space-y-1">
                  {persona.pains?.map((pain: string, pIdx: number) => (
                    <li key={pIdx} className="text-sm text-gray-700 dark:text-gray-300">{pain}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderLeadMagnet = () => {
    const leadMagnet = job.results.find(r => r.type === 'YT5')?.data;
    const quiz = job.results.find(r => r.type === 'YT4')?.data;
    
    if (!leadMagnet) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Lead magnet content not available yet...
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold">Lead Magnet: {leadMagnet.lm_title}</h3>
            <button 
              onClick={() => handleCopy(JSON.stringify(leadMagnet, null, 2), 'leadMagnet')}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {copiedStates['leadMagnet'] ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="space-y-4">
            {leadMagnet.lm_sections?.map((section: any, idx: number) => (
              <div key={idx}>
                <h4 className="font-medium">{section.title}</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {leadMagnet.pullquotes && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">Key Quotes</h3>
              </div>
              <div className="grid gap-4">
                {leadMagnet.pullquotes.map((quote: string, idx: number) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border-l-4 border-red-600">
                    <p className="text-gray-700 dark:text-gray-300 italic">"{quote}"</p>
                  </div>
                ))}
              </div>
            </>
          </div>
        )}
      </div>
    );
  };

  const renderLandingPage = () => {
    const landingPage = job.results.find(r => r.type === 'YT6')?.data?.lp_copy;
    const designBrief = job.results.find(r => r.type === 'YT7')?.data;
    
    if (!landingPage) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Landing page content not available yet...
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Main Headline</h4>
              <p className="font-medium text-xl">{landingPage.h1}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Subheadline</h4>
              <p className="text-lg">{landingPage.sub}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Key Benefits</h4>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {landingPage.bullets?.map((bullet: string, idx: number) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Call to Action</h4>
              <p className="bg-red-600 text-white px-4 py-2 inline-block rounded-md mt-1 font-medium">
                {landingPage.cta}
              </p>
            </div>
            
            {landingPage.faq && (
              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">FAQ Section</h4>
                <div className="space-y-3">
                  {landingPage.faq.map((item: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                      <p className="font-medium mb-1">{item.question}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {designBrief && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">Landing Page Design Brief</h3>
              <button 
                onClick={() => handleCopy(JSON.stringify(designBrief.lp_brief, null, 2), 'designBrief')}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {copiedStates['designBrief'] ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
              <pre className="text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                {designBrief.lp_brief && (
                  <>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Layout</h4>
                      <p>{designBrief.lp_brief.layout}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Typography</h4>
                      <p>Headings: {designBrief.lp_brief.typography.headings}</p>
                      <p>Body: {designBrief.lp_brief.typography.body}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Colors</h4>
                      <ul className="list-disc pl-5">{designBrief.lp_brief.colors.map((color: string) => <li key={color}>{color}</li>)}</ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Sections</h4>
                      {designBrief.lp_brief.sections.map((section: any) => (
                        <div key={section.name} className="mb-2"><strong>{section.name}:</strong> {section.design}</div>
                      ))}
                    </div>
                  </>
                )}
              </pre>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSocial = () => {
    const social = job.results.find(r => r.type === 'YT8')?.data;
    const heroPrompt = job.results.find(r => r.type === 'YT10')?.data;
    
    if (!social) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Social media content not available yet...
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            {social.social_posts?.map((post: any, idx: number) => (
              <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {post.platform}
                  </span>
                  <button 
                    onClick={() => handleCopy(post.content, `social-${idx}`)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {copiedStates[`social-${idx}`] ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {heroPrompt && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">Hero Image Prompt</h3>
              <button 
                onClick={() => handleCopy(heroPrompt.hero_prompt, 'heroPrompt')}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {copiedStates['heroPrompt'] ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {heroPrompt.hero_prompt}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEmail = () => {
    const welcomeEmail = job.results.find(r => r.type === 'YT12')?.data;
    const nurture = job.results.find(r => r.type === 'YT13')?.data;
    
    if (!welcomeEmail && !nurture) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Email content not available yet...
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        {welcomeEmail && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">Welcome Email</h3> 
              <button 
                onClick={() => handleCopy(`Subject: ${welcomeEmail.welcome_email.subject}\n\n${welcomeEmail.welcome_email.body}`, 'welcomeEmail')}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {copiedStates['welcomeEmail'] ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Subject</h4>
                <p className="mt-1 text-gray-900 dark:text-gray-100">{welcomeEmail.welcome_email.subject}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Body</h4>
                <div className="mt-1 whitespace-pre-wrap text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  {welcomeEmail.welcome_email.body}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {nurture && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">Email Sequence</h3>
              <button 
                onClick={() => handleCopy(JSON.stringify(nurture.drip_emails, null, 2), 'nurture')}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {copiedStates['nurture'] ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
            
            <div className="space-y-6">
              {nurture.drip_emails?.map((email: any, idx: number) => (
                <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Email {idx + 1}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Send on day {email.day_after_signup}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleCopy(`Subject: ${email.subject}\n\n${email.body}`, `email-${idx}`)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {copiedStates[`email-${idx}`] ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="font-medium mt-3 mb-2">{email.subject}</p>
                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {email.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSEO = () => {
    const seo = job.results.find(r => r.type === 'YT9')?.data;
    
    if (!seo) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            SEO article not available yet...
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold">SEO Article</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleCopy(seo.seo_article_md, 'seo')}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {copiedStates['seo'] ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap prose-headings:font-bold">
              <style>
                {`
                  .prose h1 { font-size: 1.75rem; margin-top: 2rem; margin-bottom: 1rem; }
                  .prose h2 { font-size: 1.5rem; margin-top: 1.75rem; margin-bottom: 0.75rem; }
                  .prose h3 { font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
                  .prose h4 { font-size: 1.125rem; margin-top: 1.25rem; margin-bottom: 0.5rem; }
                `}
              </style>
              <ReactMarkdown>{seo.seo_article_md}</ReactMarkdown>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3">Article Structure</h3>
          <div className="space-y-2">
            {seo.h2s?.map((heading: string, idx: number) => (
              <div key={idx} className="flex items-center">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-8">
                  {idx + 1}.
                </span>
                <span className="text-gray-800 dark:text-gray-200">{heading}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderInfographic = () => {
    const infographic = job.results.find(r => r.type === 'YT11')?.data;
    
    if (!infographic) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Infographic brief not available yet...
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold">Infographic Design Brief</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleCopy(infographic.infographic_prompt, 'infographic')}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {copiedStates['infographic'] ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {infographic.infographic_prompt}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  const renderTranscript = () => {
    const transcript = job.results.find(r => r.type === 'YT1')?.data;
    
    if (!transcript) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Transcript not available yet...
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold">Video Transcript</h3>
            <button 
              onClick={() => handleCopy(transcript.transcript, 'transcript')}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {copiedStates['transcript'] ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md max-h-96 overflow-y-auto">
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {transcript.transcript}
            </p>
          </div>
          
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Word count: {transcript.transcript.split(' ').length} words
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    if (job.results.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Processing in progress. Results will appear here...
          </p>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'transcript':
        return renderTranscript();
      case 'summary':
        return renderSummary();
      case 'quiz':
        return renderQuiz();
      case 'leadMagnet':
        return renderLeadMagnet();
      case 'landingPage':
        return renderLandingPage();
      case 'social':
        return renderSocial();
      case 'email':
        return renderEmail();
      case 'seo':
        return renderSEO();
      case 'infographic':
        return renderInfographic();
      default:
        return renderSummary();
    }
  };

  const renderQuiz = () => {
    const quiz = job.results.find(r => r.type === 'YT4')?.data;
    
    if (!quiz) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Quiz data not available yet...
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold">Quiz Questions</h3>
            <button 
              onClick={() => handleCopy(JSON.stringify(quiz, null, 2), 'quiz')}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {copiedStates['quiz'] ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="space-y-8">
            {quiz.quiz?.map((item: any, idx: number) => (
              <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-lg mb-2">{idx + 1}. {item.q}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Answer:</span> {item.a}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      Level: {item.level}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleCopy(`Q: ${item.q}\nA: ${item.a}`, `quiz-${idx}`)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-4"
                  >
                    {copiedStates[`quiz-${idx}`] ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700 relative">
        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="w-full px-4 py-3 flex items-center justify-between text-left font-medium text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <span className="flex items-center">
              <Menu className="h-4 w-4 mr-2" />
              {activeTabLabel}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showMobileMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showMobileMenu && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg z-10">
              {availableTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full px-4 py-3 text-left font-medium text-sm border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                    activeTab === tab.id
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-600 border-l-4 border-l-red-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Tabs */}
        <nav className="hidden md:block p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
          <div className="flex flex-wrap gap-3 justify-center">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
                className={`group relative px-6 py-3 font-semibold text-sm whitespace-nowrap transition-all duration-300 rounded-full shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                activeTab === tab.id
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-400'
              }`}
            >
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full opacity-20 animate-pulse"></div>
                )}
                {activeTab !== tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                )}
            </button>
          ))}
          </div>
        </nav>
      </div>
      
      <div className="p-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ResultsPanel;
import type { Standard } from './standards'

export type ChatMessage = {
  id: string
  sender: 'user' | 'ai'
  text: string
  standard?: Standard
  citations?: string[]
}

export const suggestedQuestions = [
  'Which BIS standard applies to packaged drinking water?',
  'What documents are needed for BIS certification?',
  'How do I find a recognized testing laboratory near me?',
  'What is the hallmarking process for jewellery?',
]

export const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    sender: 'ai',
    text:
      'Hello! I can help you understand Indian Standards, BIS certification, testing labs, and hallmarking requirements. Ask me anything about your product or process.',
    citations: ['[1] BIS', '[2] MaanVedh-AI'],
  },
  {
    id: 'example-user',
    sender: 'user',
    text: 'How can I help with BIS & Indian Standards?',
  },
]

export const buildAiResponse = (prompt: string): ChatMessage => {
  const normalized = prompt.toLowerCase()

  if (normalized.includes('water')) {
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text:
        'For packaged drinking water, the relevant standard is IS 14543:2024. This standard covers source water safety, treatment controls, microbiological and chemical limits, and labeling requirements. Manufacturers should also verify packaging suitability and maintain testing and traceability records.',
      standard: {
        id: 'is-14543',
        code: 'IS 14543:2024',
        title: 'Packaged Drinking Water',
        category: 'Food & Beverage',
        industry: 'Food Processing',
        status: 'Active',
        year: 2024,
        scope:
          'Requirements for packaged drinking water, including source water quality, treatment, microbiological safety, packaging, labeling, and compliance monitoring.',
        overview:
          'This standard specifies quality requirements for packaged drinking water intended for human consumption, covering source protection, treatment methods, quality parameters, and labeling obligations.',
        requirements: [
          'Use safe and potable source water with appropriate treatment controls.',
          'Maintain microbiological and chemical quality parameters within prescribed limits.',
          'Ensure packaging integrity, traceability, hygiene, and product labeling compliance.',
        ],
        relatedIds: ['is-15302', 'is-13428'],
        source: {
          name: 'BIS',
          clause: 'Clause 4.2',
          page: 'Page 12',
        },
        evidence:
          'The standard covers minimum quality and hygienic requirements for packaged drinking water including source water safety, treatment, and labeling compliance.',
      },
      citations: ['[1] BIS', '[2] IS 14543', '[3] Official Source'],
    }
  }

  if (normalized.includes('certif') || normalized.includes('document')) {
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text:
        'The BIS certification process usually begins with identifying the standard, selecting the correct scheme, testing the product, preparing documents, submitting the application, and then awaiting BIS review. For many consumer products, documentation and testing are the most important steps.',
      citations: ['[1] BIS Certification Guide', '[2] BIS Scheme Application', '[3] Testing Requirement'],
    }
  }

  if (normalized.includes('lab') || normalized.includes('testing')) {
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text:
        'You should look for BIS-recognized laboratories that can test your product category and have the required capabilities such as water quality, chemical analysis, or microbiology. Location and accreditation are important when planning product certification.',
      citations: ['[1] BIS Labs', '[2] Testing Directory', '[3] Accreditation Status'],
    }
  }

  return {
    id: `ai-${Date.now()}`,
    sender: 'ai',
    text:
      'To answer that accurately, I would first identify the product category and the relevant Indian Standard. Then I would check the applicable certification scheme, required testing, and required documentation before recommending the next steps.',
    citations: ['[1] BIS', '[2] Indian Standards', '[3] Official Source'],
  }
}

export type CertificationStep = {
  title: string
  detail: string
}

export type CertificationRequirement = {
  product: string
  applicableStandard: string
  requiredTests: string[]
  documents: string[]
  process: string[]
}

export const certificationSteps: CertificationStep[] = [
  { title: 'Identify Standard', detail: 'Confirm the relevant Indian Standard and product scope.' },
  { title: 'Select Scheme', detail: 'Choose the BIS certification scheme appropriate to the product.' },
  { title: 'Product Testing', detail: 'Test materials, safety, and compliance in an approved laboratory.' },
  { title: 'Prepare Documents', detail: 'Collect technical records, business details, and application documentation.' },
  { title: 'Apply', detail: 'Submit the application and supporting evidence to BIS.' },
  { title: 'BIS Review', detail: 'BIS evaluates the application, testing, and compliance records.' },
  { title: 'Certification', detail: 'Receive certification and maintain annual compliance.' },
]

export const certificationRequirements: CertificationRequirement[] = [
  {
    product: 'Packaged Drinking Water',
    applicableStandard: 'IS 14543:2024',
    requiredTests: ['Microbiological safety', 'Chemical quality check', 'Source water verification'],
    documents: ['Factory registration', 'Product composition details', 'Testing reports', 'Process flow chart'],
    process: [
      'Identify the standard and registration category.',
      'Select the appropriate BIS certification scheme.',
      'Complete testing at a recognized laboratory.',
      'Gather required permits, forms, and quality documentation.',
      'Submit application and wait for review.',
    ],
  },
  {
    product: 'Food Packaging',
    applicableStandard: 'IS 15302:2022',
    requiredTests: ['Material safety', 'Migration check', 'Packaging integrity'],
    documents: ['Supplier declarations', 'Material specification sheet', 'Packaging details', 'Testing records'],
    process: [
      'Confirm the material and packaging product category.',
      'Identify the relevant testing standard.',
      'Run product and material analysis at approved labs.',
      'Prepare compliance dossier and application record.',
      'Submit to BIS and track review cycle.',
    ],
  },
]

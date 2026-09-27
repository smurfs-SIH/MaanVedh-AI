export type Laboratory = {
  id: string
  name: string
  location: string
  status: 'BIS Recognized' | 'Testing Available' | 'Priority'
  capabilities: string[]
  distance?: string
  description: string
}

export const laboratories: Laboratory[] = [
  {
    id: 'abc-testing',
    name: 'ABC Testing Laboratory',
    location: 'Jaipur, Rajasthan',
    status: 'BIS Recognized',
    capabilities: ['Water', 'Chemical', 'Microbiology'],
    distance: '14 km',
    description: 'Recognized for water quality and microbiological testing for packaged products and industrial materials.',
  },
  {
    id: 'indigo-lab',
    name: 'Indigo Quality Labs',
    location: 'Bengaluru, Karnataka',
    status: 'Testing Available',
    capabilities: ['Chemical', 'Packaging'],
    distance: '9 km',
    description: 'Supports chemical residue analysis, packaging validation, and compliance documentation for product teams.',
  },
  {
    id: 'saffron-hygiene',
    name: 'Saffron Hygiene & Safety Lab',
    location: 'Ahmedabad, Gujarat',
    status: 'BIS Recognized',
    capabilities: ['Water', 'Microbiology', 'Safety'],
    distance: '21 km',
    description: 'Broad laboratory coverage for packaged food, water, and consumer goods testing across major use cases.',
  },
]

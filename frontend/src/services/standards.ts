export type Standard = {
  id: string
  code: string
  title: string
  category: string
  industry: string
  status: 'Active' | 'Draft' | 'Revised'
  year: number
  scope: string
  overview: string
  requirements: string[]
  relatedIds: string[]
  source: {
    name: string
    clause: string
    page: string
  }
  evidence: string
}

export const standards: Standard[] = [
  {
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
      'Document quality control and testing records for regulatory audits.',
    ],
    relatedIds: ['is-15302', 'is-13428', 'is-9843'],
    source: {
      name: 'BIS',
      clause: 'Clause 4.2',
      page: 'Page 12',
    },
    evidence:
      'The standard covers minimum quality and hygienic requirements for packaged drinking water including source water safety, treatment, and labeling compliance.',
  },
  {
    id: 'is-15302',
    code: 'IS 15302:2022',
    title: 'Food Contact Materials',
    category: 'Packaging',
    industry: 'Packaging & Materials',
    status: 'Active',
    year: 2022,
    scope:
      'Requirements for specific food contact materials used in packaging and processing for safety, migration, and durability.',
    overview:
      'This standard addresses food-contact material quality and safety, helping manufacturers verify that packaging systems satisfy health and performance expectations.',
    requirements: [
      'Confirm material suitability for intended food-contact conditions.',
      'Verify migration limits and chemical safety for food contact surfaces.',
      'Carry out material traceability and supplier documentation.',
    ],
    relatedIds: ['is-14543', 'is-13428'],
    source: {
      name: 'BIS',
      clause: 'Clause 3.1',
      page: 'Page 7',
    },
    evidence:
      'Food-contact materials need to satisfy migration, safety, and documentation requirements to remain suitable for packaged goods.',
  },
  {
    id: 'is-13428',
    code: 'IS 13428:2024',
    title: 'Plastic Pouch Packaging',
    category: 'Packaging',
    industry: 'Packaging',
    status: 'Revised',
    year: 2024,
    scope:
      'Specifications concerning packaging films and material performance for safe and hygienic packaging use in food and consumer products.',
    overview:
      'This specification provides guidance for durable and hygienic plastic packaging materials and evaluation methods relevant to packaging applications.',
    requirements: [
      'Verify material strength, barrier performance, and integrity.',
      'Ensure safe packaging practices for contact with food and beverages.',
      'Maintain labeling and traceability records for supply chains.',
    ],
    relatedIds: ['is-14543', 'is-15302'],
    source: {
      name: 'BIS',
      clause: 'Clause 5.4',
      page: 'Page 18',
    },
    evidence:
      'Packaging compliance depends on both material specifications and correct application in product handling systems.',
  },
  {
    id: 'is-9843',
    code: 'IS 9843:2017',
    title: 'Refined Oils',
    category: 'Food & Beverage',
    industry: 'Edible Oils',
    status: 'Active',
    year: 2017,
    scope:
      'Quality requirements and testing standards for refined edible oils used in the food supply chain.',
    overview:
      'This standard presents core quality requirements for refined edible oils, including purity, physicochemical characteristics, and consumer safety.',
    requirements: [
      'Check purity, acidity, and contaminants against specification limits.',
      'Verify packaging and labeling integrity to avoid contamination risks.',
      'Maintain testing logs and quality assurance records.',
    ],
    relatedIds: ['is-14543', 'is-15302'],
    source: {
      name: 'BIS',
      clause: 'Section 3',
      page: 'Page 6',
    },
    evidence:
      'For edible products, compliance usually requires testing, documentation, and traceability across the supply chain.',
  },
  {
    id: 'is-2711',
    code: 'IS 2711:2023',
    title: 'Domestic Electric Water Heaters',
    category: 'Electrical',
    industry: 'Electrical Appliances',
    status: 'Active',
    year: 2023,
    scope:
      'Safety and performance requirements for domestic electric water heating systems and related components.',
    overview:
      'The standard governs electrical safety, construction, and performance requirements for electric water heaters in domestic environments.',
    requirements: [
      'Ensure safe electrical insulation and mechanical safety.',
      'Verify thermal performance and protective device functionality.',
      'Ensure correct labeling and installation guidance for end-users.',
    ],
    relatedIds: ['is-14543', 'is-9843'],
    source: {
      name: 'BIS',
      clause: 'Clause 6.1',
      page: 'Page 28',
    },
    evidence:
      'Safety-driven appliance certification depends on electrical and performance testing before the product reaches the market.',
  },
]

export const industryFilters = ['All', 'Food Processing', 'Packaging', 'Electrical Appliances', 'Edible Oils']

export const statusFilters = ['All', 'Active', 'Revised', 'Draft']

export const standardCategories = ['All', 'Food & Beverage', 'Packaging', 'Electrical']

export const searchStandards = (query: string, industry: string, category: string, status: string) => {
  const q = query.toLowerCase().trim()
  return standards.filter((standard) => {
    const matchesQuery =
      !q ||
      standard.code.toLowerCase().includes(q) ||
      standard.title.toLowerCase().includes(q) ||
      standard.category.toLowerCase().includes(q) ||
      standard.industry.toLowerCase().includes(q)

    const matchesIndustry = industry === 'All' || standard.industry === industry
    const matchesCategory = category === 'All' || standard.category === category
    const matchesStatus = status === 'All' || standard.status === status

    return matchesQuery && matchesIndustry && matchesCategory && matchesStatus
  })
}

export const getStandardById = (id: string) => standards.find((standard) => standard.id === id)

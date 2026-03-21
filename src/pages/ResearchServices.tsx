import { motion } from 'framer-motion'
import { FlaskConical, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Preimplantation Genetic Testing (PGT-A)',
    items: [
      'Chromosomal aneuploidy screening of embryos',
      'Next-generation sequencing (NGS) based analysis',
      'Mosaic embryo detection and reporting',
      'Compatible with fresh and frozen biopsy cycles',
    ],
  },
  {
    title: 'PGT-M (Monogenic Disorders)',
    items: [
      'Single-gene disorder detection (e.g. cystic fibrosis, sickle cell)',
      'Custom probe design for family-specific mutations',
      'Huntington\'s disease and BRCA mutation testing',
      'Combined with PGT-A for comprehensive screening',
    ],
  },
  {
    title: 'PGT-SR (Structural Rearrangements)',
    items: [
      'Detection of chromosomal translocations and inversions',
      'Balanced and unbalanced rearrangement identification',
      'Carrier parent karyotype-informed analysis',
      'Reduces recurrent miscarriage risk',
    ],
  },
  {
    title: 'Carrier Screening',
    items: [
      'Expanded carrier screening for 200+ conditions',
      'Autosomal recessive and X-linked disorder panels',
      'Couple-based risk assessment and reporting',
      'Pre-conception and pre-IVF screening options',
    ],
  },
  {
    title: 'Non-Invasive Prenatal Testing (NIPT)',
    items: [
      'Cell-free fetal DNA analysis from maternal blood',
      'Trisomy 21, 18, and 13 screening',
      'Sex chromosome aneuploidy detection',
      'Microdeletion syndrome panels available',
    ],
  },
  {
    title: 'Sperm DNA Fragmentation & Analysis',
    items: [
      'Sperm DNA fragmentation index (DFI) testing',
      'TUNEL and SCSA-based assays',
      'Correlation with IVF and ICSI outcomes',
      'Guidance on treatment optimization',
    ],
  },
]

const whyPoints = [
  { label: 'Study Design Support', desc: 'Our clinical genetics team can help you design IVF research protocols, select appropriate testing methodologies, and define patient cohorts for meaningful outcomes.' },
  { label: 'Advanced Bioinformatics', desc: 'Our bioinformaticians deliver deep analysis of genetic data using validated, reproducible pipelines purpose-built for reproductive genomics research.' },
  { label: 'High-Accuracy Platforms', desc: 'We use the latest NGS platforms with rigorous QC at every stage, ensuring data you can publish and trust.' },
  { label: 'Custom Research Panels', desc: 'We can design bespoke gene panels and analysis packages tailored to your specific IVF research questions.' },
  { label: 'Proven Data Quality', desc: 'Our track record in peer-reviewed publications reflects our commitment to high-quality, reproducible genetic data with guaranteed accuracy metrics.' },
  { label: 'Comprehensive Reporting', desc: 'Receive clear, clinician-friendly reports with interactive data views, enabling you to explore findings at a glance.' },
  { label: 'Expert Interpretation', desc: 'Our genetics experts walk you through results in detail, supporting better clinical decision-making and research conclusions.' },
]

const platforms = [
  'PGT-A (Aneuplody Screening)',
  'PGT-M (Monogenic Testing)',
  'PGT-SR (Structural Rearrangements)',
  'Expanded Carrier Screening',
  'NIPT (Non-Invasive Prenatal)',
  'Sperm DNA Fragmentation',
  'Embryo Mosaicism Analysis',
  'Mitochondrial DNA Quantification',
  'HLA Matching for Saviour Siblings',
  'Endometrial Receptivity Analysis',
  'Recurrent Implantation Failure Panel',
]

const ResearchServices = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <FlaskConical className="h-14 w-14 text-pink-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Research Services</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Accelerate IVF research with our comprehensive genetic testing services — from preimplantation screening to carrier analysis, backed by expert bioinformatics and clinical-grade accuracy.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center mt-8 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Testing Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{svc.title}</h3>
                {svc.items && (
                  <ul className="space-y-2">
                    {svc.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose IVF 360 For Your Academic Projects?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyPoints.map((pt, i) => (
              <motion.div
                key={pt.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4"
              >
                <CheckCircle className="h-6 w-6 text-pink-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-900">{pt.label}: </span>
                  {pt.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Testing Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {platforms.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-4 border border-gray-100"
              >
                <CheckCircle className="h-5 w-5 text-pink-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-medium">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pink-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to accelerate your research?</h2>
          <p className="text-gray-600 mb-8">Our team of experts is here to support you at every stage — from project design to data interpretation.</p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  )
}

export default ResearchServices

import { motion } from 'framer-motion'
import { Dna, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const tests = [
  {
    title: 'Preimplantation Genetic Testing (PGT-A)',
    description: 'NGS-based aneuploidy screening of all 23 chromosome pairs. Detects extra/missing chromosomes and mosaicism — ideal for advanced maternal age, recurrent pregnancy loss, and single embryo transfer cycles.',
  },
  {
    title: 'PGT-M (Monogenic Disorders)',
    description: 'Detects specific single-gene mutations with custom probe design. Used when there is a family history of genetic disease, a known mutation, or a previous affected pregnancy.',
  },
  {
    title: 'PGT-SR (Structural Rearrangements)',
    description: 'Identifies unbalanced chromosomal structural changes including translocations and inversions. Recommended when one or both parents carry a known structural rearrangement.',
  },
  {
    title: 'Carrier Screening',
    description: 'Expanded panel screening for 200+ autosomal recessive and X-linked conditions. Provides couple-based risk assessment before conception or IVF to guide informed family planning.',
  },
  {
    title: 'Non-Invasive Prenatal Testing (NIPT)',
    description: 'Analyzes cell-free fetal DNA from maternal blood to screen for trisomies 21, 18, and 13, sex chromosome aneuploidies, and microdeletion syndromes with high accuracy.',
  },
  {
    title: 'Sperm DNA Fragmentation',
    description: 'Measures sperm DNA fragmentation index (DFI) using TUNEL/SCSA assays. High fragmentation correlates with poor IVF/ICSI outcomes and guides treatment optimization.',
  },
]

const IVFGeneticTests = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Dna className="h-14 w-14 text-pink-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">IVF Genetic Tests</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Comprehensive genetic testing solutions to maximize IVF success and ensure the healthiest outcomes for your family.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center mt-8 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Book a Test <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Genetic Testing Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test, i) => (
              <motion.div
                key={test.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <CheckCircle className="h-8 w-8 text-pink-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.title}</h3>
                <p className="text-gray-600 text-sm">{test.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PGT Types & Specifications */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">

              {/* Left — Clinical Indications */}
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Clinical Indications of Preimplantation Genetic Testing (PGT)
                </h2>
                <div className="space-y-7">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">PGT-A</h3>
                    <ul className="space-y-1.5">
                      {['Advanced maternal age.', 'Recurrent pregnancy loss.', 'Repeated implantation failure.', 'Male factor infertility.', 'Patients undergoing single embryo transfer.', 'Donor egg cycles.'].map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-1.5" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">PGT-M</h3>
                    <ul className="space-y-1.5">
                      {['Family history of genetic disorders.', 'Known genetic variants.', 'Previous affected pregnancy.'].map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-1.5" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">PGT-SR</h3>
                    <ul className="space-y-1.5">
                      {['When parents are carriers of structural rearrangements.', 'Inversions in chromosomes.'].map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-1.5" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right — Specifications */}
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Specifications</h2>
                <div className="space-y-6">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-pink-600">Technology: </span>
                    NGS-based genome-wide screening of IVF embryos.
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-pink-600">Coverage: </span>
                    All 23 chromosome pairs, detects aneuploidies, segmental imbalances &amp; mosaicism, identifies chromosomal changes &gt;10 Mb.
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-pink-600">Accuracy: </span>
                    100% sensitivity for aneuploidy detection, 99.98% specificity ensures highly reliable embryo selection.
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-pink-600">Applicable For: </span>
                    PGT-A: Aneuploidy screening, PGT-M: Single-gene disorders, PGT-SR: Structural rearrangements in carriers of translocations/inversions.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pink-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8">Our specialists are here to guide you through the right genetic testing pathway.</p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Book a Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default IVFGeneticTests

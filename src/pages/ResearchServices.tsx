import { motion } from 'framer-motion'
import { FlaskConical, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'



const whyPoints = [
  { label: 'Project Design Support', desc: 'Our experts provide guidance in experimental design, sample preparation, and methodology selection to ensure successful research outcomes.' },
  { label: 'Next-Generation Sequencing (NGS) Services', desc: 'Comprehensive DNA-Seq, RNA-Seq, and whole-genome sequencing solutions using advanced technologies and standardized workflows.' },
  { label: 'Clinical Genomics & PGT Services', desc: 'Specialized support for PGT-A, PGT-M, and PGT-SR, including embryo screening, CNV analysis, and clinical report generation.' },
  { label: 'Advanced Bioinformatics Pipelines', desc: 'Development and execution of robust pipelines using GATK, Nextflow, Snakemake, and Docker for scalable and reproducible analysis.' },
  { label: 'Genomic & Multi-Omics Analysis', desc: 'Expertise in variant calling, GWAS, gene expression analysis, CNV detection, and integration of genomics, proteomics, and multi-omics datasets.' },
  { label: 'AI-Powered Bioinformatics Solutions', desc: 'Development of intelligent, automated pipelines for genomics, proteomics, and bioinformatics workflows using machine learning and AI-based models.' },
  { label: 'AI-Driven Variant Interpretation', desc: 'Enhancing accuracy and efficiency in variant detection, annotation, and clinical interpretation using AI techniques.' },
  { label: 'Custom Analysis Solutions', desc: 'Tailored bioinformatics and AI workflows designed to meet specific research and clinical requirements.' },
  { label: 'High-Quality Data Processing', desc: 'Ensuring accurate, reliable, and reproducible results through stringent quality control and validated pipelines.' },
  { label: 'Interactive Reports & Visualization', desc: 'User-friendly reports with graphical representations for easy interpretation of complex genomic data.' },
  { label: 'Academic & Research Support', desc: 'End-to-end support for students and researchers, including project guidance, dissertation work, and publication-ready analysis.' },
  { label: 'PhD & Higher Education Support', desc: 'Dedicated support for PhD, M.Tech, B.Tech, M.Sc, B.Sc, and Pharmacy students in bioinformatics and related life science fields, including project development, thesis work, data analysis, and research publication assistance.' },
  { label: 'PhD & Publication Support', desc: 'Assistance in research paper writing, data analysis, interpretation, and journal submission.' },
  { label: 'Training & Courses', desc: 'Hands-on training programs in bioinformatics, genomics, NGS pipelines, and AI-based data analysis for students and professionals.' },
  { label: 'End-to-End Project Execution', desc: 'Complete support from raw data processing to final report generation for academic, clinical, and industry projects.' },
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

 
      

      {/* Why Choose */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Can Do For Your Academic Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

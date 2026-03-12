export default function TeacherCard({ name, role, bio, image, featured = false }) {
  if (featured) {
    return (
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-purple to-purple-900 shadow-2xl flex flex-col md:flex-row mb-14">
        {/* Founder badge */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 text-brand-purple text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
          Founder & Head of Academy
        </div>

        {/* Photo */}
        <div className="md:w-2/5 flex-shrink-0 min-h-[300px] md:min-h-[420px] relative">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover object-top"
            onError={(e) => { e.currentTarget.style.opacity = '0' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-purple/60 hidden md:block" />
        </div>

        {/* Content */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center gap-4 text-white">
          <h2 className="text-section-h font-antique font-section-h leading-tight">{name}</h2>
          <p className="text-brand-mint text-sm font-montserrat font-bold uppercase tracking-widest">{role}</p>
          <p className="text-white/85 text-section-p-large font-montserrat font-section-p-large leading-relaxed whitespace-pre-line">{bio}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col border border-gray-100">
      {/* Photo */}
      <div className="w-full aspect-[4/3] bg-[#f9f3fa] overflow-hidden relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
          onError={(e) => { e.currentTarget.style.opacity = '0' }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-brand-logo font-montserrat font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-xs font-montserrat font-bold uppercase tracking-widest mb-3 text-brand-purple">{role}</p>
        <p className="text-section-p font-montserrat text-gray-600 leading-relaxed flex-grow whitespace-pre-line">{bio}</p>
      </div>
    </div>
  )
}

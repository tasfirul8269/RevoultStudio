interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface ServiceFeaturesProps {
  title: string;
  description: string;
  features: Feature[];
}

export default function ServiceFeatures({ title, description, features }: ServiceFeaturesProps) {
  return (
    <section className="py-16 bg-[#0a0613]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-[#b8c5ff] max-w-3xl mx-auto opacity-90">
            {description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-[#1a1a2e] p-6 rounded-xl border border-[#2a2a45] hover:border-[#3a3a5a] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-[#b8c5ff] text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

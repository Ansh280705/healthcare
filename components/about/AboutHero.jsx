import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="py-10 pb-24">
      <div className="container mx-auto px-6 lg:px-20 grid md:grid-cols-2 gap-14 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            About <span className="text-client">DoctorDesk</span>
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            DoctorDesk is a modern online healthcare platform that enables
            patients to consult verified doctors digitally using a secure,
            transparent, and credit-based consultation system.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Built with scalability and user trust in mind, DoctorDesk focuses on
            fast online doctor consultations, data security, and a seamless
            patient experience.
          </p>
        </div>

        {/* RIGHT IMAGE + CARD */}
        <div className="relative">
         <Image
  src="/about/heroo.png"
  alt="Online doctor consultation platform"
  width={600}
  height={420}
  className="rounded-3xl object-cover"
/>


          <div className="absolute -bottom-8 right-6 bg-card border rounded-2xl p-6 shadow-lg max-w-sm">
            <p className="text-sm text-muted-foreground leading-relaxed">
              A smarter approach to digital healthcare — focused on accessibility,
              transparency, and reliable medical consultations.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

import { useParams } from "react-router-dom";
import { teamMembers } from "./teamData";
import SEO from "../components/SEO";

export default function TeamProfile() {
  const { slug } = useParams();

  const member = teamMembers.find(
    (item) => item.slug === slug
  );

  if (!member) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050b1d] text-white">
        Member Not Found
      </div>
    );
  }

  const canonicalUrl = `https://centa.ltd/team/${member.slug}`;

  const seoTitle = `${member.name} — ${member.role} | Centa Limited`;

  const seoDescription =
    member.about ||
    `Learn more about ${member.name}, ${member.role} at Centa Limited.`;

  const seoImage = member.image?.startsWith("http")
    ? member.image
    : `https://centa.ltd${member.image}`;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        image={seoImage}
      />

      <section className="min-h-screen bg-black px-6 py-24">
        <div className="mx-auto max-w-6xl">
          {/* PROFILE */}
       <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
  {/* IMAGE */}
  <div className="group relative flex w-full justify-center md:-translate-x-20">
    <div
      className="
        absolute
        inset-0
        rounded-3xl
        border
        border-cyan-400/40
        shadow-[0_0_25px_rgba(34,211,238,0.15)]
        transition-all
        duration-500
        group-hover:border-cyan-400/70
        group-hover:shadow-[0_0_45px_rgba(34,211,238,0.35)]
      "
    />

    <img
      src={member.image}
      alt={member.name}
      className="
        relative
        h-[480px]
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        object-cover
        object-[center_48%]
        ring-1
        ring-cyan-400/20
        transition-all
        duration-500
        group-hover:scale-[1.01]
        md:h-[620px]
      "
    />
  </div>

  {/* INFO */}
  <div className="w-full">
    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
      Centa Limited
    </p>

    <h1 className="mt-4 break-words text-4xl font-bold text-white sm:text-5xl md:text-6xl">
      {member.name}
    </h1>

    <h2 className="mt-4 text-lg text-cyan-400 md:text-xl">
      {member.role}
    </h2>

    <p className="mt-8 leading-8 text-gray-400">
      {member.about}
    </p>

    <div className="mt-10">
      <h3 className="mb-5 text-lg font-semibold text-white">
        Expertise
      </h3>

      <div className="flex flex-wrap gap-3">
        {member.expertise.map((skill) => (
          <span
            key={skill}
            className="
              rounded-full
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-sm
              text-gray-300
              transition
              hover:border-cyan-400/40
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>
        </div>
      </section>
    </>
  );
}
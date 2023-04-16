import {
  DocumentArrowUpIcon,
  UserGroupIcon,
  CalendarIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  BriefcaseIcon,
} from "@heroicons/react/20/solid";
import Demo from "@images/example2.png";

const features = [
  {
    name: "No experience required",
    description:
      "Our platform is designed to accommodate students from diverse backgrounds, allowing you to apply for microinternships without any prior professional experience.",
    icon: CheckCircleIcon,
  },
  {
    name: "Boost your resume",
    description:
      "Enhance your resume with unique professional experiences, showcasing your adaptability and eagerness to learn in a competitive job market.",
    icon: DocumentArrowUpIcon,
  },
  {
    name: "Flexible scheduling",
    description:
      "Microinternships offer short-term commitments, enabling you to balance your academic responsibilities while still gaining valuable professional exposure.",
    icon: CalendarIcon,
  },
  {
    name: "Expand your professional network",
    description:
      "Connect with industry professionals, mentors, and fellow interns to create lasting relationships that can lead to future opportunities and collaborations.",
    icon: UserGroupIcon,
  },
  {
    name: "Gain meaningful professional experience",
    description:
      "Engage in real-world projects with local businesses and startups, helping you develop practical skills and enhance your understanding of various industries.",
    icon: BriefcaseIcon,
  },
  {
    name: "Apply your academic knowledge",
    description:
      "Utilize the knowledge and skills you've gained in your academic studies and apply them to real-world situations, fostering a deeper understanding of your field.",
    icon: AcademicCapIcon,
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Boost Your Career
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            No experience? No problem.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Local businesses and startups are recruiting college students
            for short-term projects you can complete during your studies - no
            experience necessary!
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <img
            src={Demo}
            alt="App screenshot"
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            width={2542}
            height={1238}
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{" "}
              <dd>{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

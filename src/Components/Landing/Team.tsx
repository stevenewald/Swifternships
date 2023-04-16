import Andrew from "@images/andrew.jpg";
import Justin from "@images/justin.jpg";
import Ryan from "@images/ryan.png";
const people = [
  {
    name: 'Steve Ewald',
    role: 'Computer Science at Northwestern',
    imageUrl:
      'https://media.licdn.com/dms/image/D5603AQFZEpi4KfIkdA/profile-displayphoto-shrink_400_400/0/1675544376371?e=1686787200&v=beta&t=bkpwcMnVxmN92e1J0IEvypqqFUVFFKa18okJr79UW7U',
    bio: 'From my time at KTP (pre-professional organization), I\'ve found that getting the first internship is often the hardest part of the job search. I\'m excited to help students navigate the process and land their first internship.',
  },
  {
    name: 'Andrew Pulver',
    role: 'Computer Science and Music at Northwestern',
    imageUrl:
      Andrew,
    bio: 'As an advocate for education and entrepreneurship, it\'s truly exciting to help startups and local businesses effectively leverage the skills and talents of college students. I\'m enthusiastic about creating more opportunities for students to gain hands-on experience and build their skills through experiential learning.',
  },
  {
    name: 'Justin Dong',
    role: 'Computer Science and Math at Northwestern',
    imageUrl:
      Justin,
    bio: 'It\'s exciting to help enable startups and local businesses to efficiently access college talent. I\'m enthusiastic to provide more opportunities for students to develop their skill sets through experiential learning.',
  },
  {
    name: 'Ryan Newkirk',
    role: 'Computer Science at Northwestern',
    imageUrl:
      Ryan,
    bio: 'Enabling startups and local businesses to connect with college talent with ease is a cause that is close to my heart. As someone who has experienced the benefits of mentorship and learning opportunities firsthand, I\'m excited to provide students with more chances to develop their skills and excel in their chosen fields.',
  },
]

export default function Team() {
  return (
    <div className="bg-white py-24 sm:py-32" id="team">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet the Team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Swifternships is developed by college students, for college students.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
        >
          {people.map((person) => (
            <li key={person.name} className="flex flex-col gap-6 xl:flex-row">
              <img className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src={person.imageUrl} alt="" />
              <div className="flex-auto">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-base leading-7 text-gray-600">{person.role}</p>
                <p className="mt-6 text-base leading-7 text-gray-600">{person.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

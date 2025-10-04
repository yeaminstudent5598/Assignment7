import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const skills = [
  'Next.js', 'React', 'TypeScript', 'JavaScript', 'Node.js', 
  'Prisma', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'shadcn/ui',
  'NextAuth', 'REST API', 'Git & GitHub'
];

const experience = [
  {
    role: 'Full-Stack Developer',
    company: 'Tech Solutions Inc.',
    duration: 'Jan 2024 - Present',
    description: 'Developed and maintained scalable web applications using the MERN stack. Collaborated with a team of 5 developers to deliver high-quality software.'
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Web Innovators',
    duration: 'Jun 2023 - Dec 2023',
    description: 'Assisted in building responsive user interfaces with React and Tailwind CSS. Participated in daily stand-ups and code reviews.'
  }
];

export default function AboutPage() {
  return (
    <main className="container max-w-4xl py-12 md:py-20">
      <section className="flex flex-col items-center text-center">
        <Image
          src="https://i.ibb.co.com/QFQ40kDN/20231124-163457-jpg-1.jpg" // সঠিক URL
          alt="Yeamin Madbor"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full object-cover"
          priority
        />
        <h1 className="mt-6 text-4xl font-bold">Yeamin Madbor</h1>
        <p className="mt-2 text-lg text-muted-foreground">Full-Stack Web Developer</p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">About Me</h2>
        <div className="mt-4 text-muted-foreground">
          <p>
            I am a passionate and dedicated web developer with a love for creating elegant and efficient solutions. My journey into programming started with a fascination for how things work, and it has evolved into a career where I get to build amazing things on the web every day. I specialize in the MERN stack and modern technologies like Next.js and Prisma.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">My Skills</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Work Experience</h2>
        <div className="mt-4 space-y-8">
          {experience.map((job) => (
            <Card key={job.company}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{job.role}</CardTitle>
                  <p className="text-sm text-muted-foreground">{job.duration}</p>
                </div>
                <p className="text-md font-medium text-muted-foreground">{job.company}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{job.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
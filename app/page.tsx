import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import { About, Contact, Experience, Projects, Skills } from "@/components/Sections";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Terminal />
    </main>
  );
}

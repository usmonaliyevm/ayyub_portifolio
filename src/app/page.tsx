import { Hero } from "@/components/Hero";
import { Modes } from "@/components/Modes";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { TimelineHost } from "@/components/TimelineHost";

export default function Page() {
  return (
    <main>
      <Hero />
      <Modes />
      <About />
      <Contact />
      <TimelineHost />
    </main>
  );
}

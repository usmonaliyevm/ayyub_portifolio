import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Cuts } from "@/components/Cuts";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { TimelineHost } from "@/components/TimelineHost";

export default function Page() {
  return (
    <main>
      <Hero />
      <Work />
      <Cuts />
      <About />
      <Contact />
      <TimelineHost />
    </main>
  );
}

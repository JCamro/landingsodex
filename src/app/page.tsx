import { Hero } from "@/components/sections/hero";
import { Its } from "@/components/sections/its";
import { Methods } from "@/components/sections/methods";
import { Recommendations } from "@/components/sections/recommendations";
import { Remember } from "@/components/sections/remember";
import { Steps } from "@/components/sections/steps";
import { ValuesBand } from "@/components/sections/values-band";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ValuesBand />
        <Steps />
        <Recommendations />
        <Its />
        <Methods />
        <Remember />
      </main>
      <SiteFooter />
    </>
  );
}

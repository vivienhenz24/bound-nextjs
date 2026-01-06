import { Hero } from "@/components/landing/hero"
import { CustomerRow } from "@/components/landing/customer-row"
import { ProblemSolution } from "@/components/landing/problem-solution"
import { HowItWorks } from "@/components/landing/how-it-works"

export default function Home() {
  return (
    <>
      <Hero />
      <CustomerRow />
      <ProblemSolution />
      <HowItWorks />
    </>
  )
}

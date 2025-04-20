import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Code, FileText, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AnimatedBackground from "@/components/animated-background"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Code className="h-6 w-6" />
            <span>NerdAI</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <AnimatedBackground />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Boost your Development Speed with GenAI
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Automate code generation, test case writing, and documentation effortlessly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button asChild size="lg" className="px-8">
                    <Link href="/signup">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    alt="NerdAI Dashboard Preview"
                    width={500}
                    height={500}
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Powerful AI tools to streamline your development workflow
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="group">
                <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Boilerplate Generator"
                      width={400}
                      height={200}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Generate Boilerplate Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="min-h-[80px]">
                      Quickly generate starter code for your projects based on your requirements. Save time on
                      repetitive coding tasks.
                    </CardDescription>
                    <Button asChild className="mt-4 w-full">
                      <Link href="/dashboard?tab=boilerplate">
                        Try Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="group">
                <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Test Case Generator"
                      width={400}
                      height={200}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <TestTube className="h-5 w-5 text-primary" />
                      Generate Test Cases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="min-h-[80px]">
                      Create comprehensive test suites with AI. Achieve high code coverage and catch bugs before they
                      reach production.
                    </CardDescription>
                    <Button asChild className="mt-4 w-full">
                      <Link href="/dashboard?tab=tests">
                        Try Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="group">
                <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Documentation Generator"
                      width={400}
                      height={200}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Generate Documentation & PR Summaries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="min-h-[80px]">
                      Automatically create clear documentation and concise pull request summaries to improve team
                      collaboration.
                    </CardDescription>
                    <Button asChild className="mt-4 w-full">
                      <Link href="/dashboard?tab=docs">
                        Try Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="NerdAI Demo"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" variant="outline" className="bg-background/80 backdrop-blur-sm">
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">See NerdAI in Action</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Watch how NerdAI can transform your development workflow and save you hours of coding time.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>Generate boilerplate code in seconds</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>Create comprehensive test suites automatically</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>Document your code and summarize PRs effortlessly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} NerdAI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

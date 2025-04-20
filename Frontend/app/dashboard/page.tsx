"use client"

import { useState } from "react"
import { Loader2, AlertCircle, Code, FileCode, Layers } from 'lucide-react'

export default function Dashboard() {
  // State management
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)


  type TabId =
  | "auto_jira"
  | "boilerplate"
  | "code_review"
  | "docs_generator"
  | "test_case_generator"
  | "pr_summary"
  | "refactor_advice"
  const [activeTab, setActiveTab] = useState<TabId>("auto_jira");

  // Form inputs state
  const [inputs, setInputs] = useState<Record<string, string>>({
    auto_jira: "",
    boilerplate: "",
    code_review: "",
    docs_generator: "",
    test_case_generator: "",
    pr_summary: "",
    refactor_advice: ""
  })
  
  const tabs:  { id: TabId; label: string; placeholder: string }[]= [
    { id: "auto_jira", label: "Auto JIRA", placeholder: "Describe your feature idea or bug..." },
    { id: "boilerplate", label: "Boilerplate", placeholder: "Describe what you want to build..." },
    { id: "code_review", label: "Code Review", placeholder: "Paste your code for review..." },
    { id: "docs_generator", label: "Docs Generator", placeholder: "Paste your code to generate documentation..." },
    { id: "test_case_generator", label: "Test Case Generator", placeholder: "Paste your function or component code..." },
    { id: "pr_summary", label: "PR Summary", placeholder: "Paste your PR description or diff..." },
    { id: "refactor_advice", label: "Refactor Advice", placeholder: "Paste your code for refactoring suggestions..." }
  ]
  
  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }
  const preprocessText = (text: string, tab: TabId) => {
    switch (tab) {
      case "boilerplate":
        return text.trim().replace(/\s+/g, ' ');  // Remove excess whitespace
      case "code_review":
        return text.trim().replace(/\s+/g, ' ');  // Clean code review text
      case "test_case_generator":
        return text.trim().replace(/\/\/.*\n/g, '');  // Remove comments
      case "refactor_advice":
        return text.trim().replace(/\s+/g, ' ');  // Clean refactor advice
      default:
        return text.trim();  // Default: trim whitespace
    }
  }

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
  
    try {
      let bodyPayload: Record<string, string> = {}
      const preprocessedInput = preprocessText(inputs[activeTab], activeTab);
      if (activeTab === "boilerplate") {
        bodyPayload = {
          project_description: preprocessedInput
        };
      } else {
        bodyPayload = ["code_review", "docs_generator", "test_case_generator", "refactor_advice"].includes(activeTab)
          ? { code: preprocessedInput }  // "code" for code-related tasks
          : { prompt: preprocessedInput };  // "prompt" for others
      }
  
      const response = await fetch(`http://localhost:8000/api/${activeTab}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      })
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
  
      const data = await response.json()
      setResult(data.result || data.response || JSON.stringify(data, null, 2))
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            NerdAI – GenAI Developer Assistant
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Powerful AI tools to accelerate your development workflow
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex flex-wrap -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-150 ease-in-out ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Form Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>

            {/* Conditional Form Fields */}
            {activeTab === "boilerplate" ? (
              <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  
                  <div className="space-y-2">
                    <label htmlFor="use-case" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <FileCode className="h-4 w-4 mr-2" />
                      Use Case
                    </label>
                    <textarea
                      id="use-case"
                      value={inputs.boilerplate}
                      onChange={(e) => handleInputChange("boilerplate", e.target.value)}
                      placeholder="Describe what you want to build..."
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Describe the component or feature you want to generate
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {activeTab === "auto_jira" ? "Feature Idea" : "Input"}
                </label>
                <textarea
                  id="prompt"
                  value={inputs[`${activeTab}`]}
                  onChange={(e) => handleInputChange(`${activeTab}`, e.target.value)}
                  placeholder={tabs.find(tab => tab.id === activeTab)?.placeholder}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                />
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  "Generate"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {(result || error) && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {error ? "Error" : "Result"}
            </h2>
            
            {error ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 dark:text-red-400">{error}</p>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute right-2 top-2 flex space-x-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(result || "")}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-auto max-h-[500px]">
                  <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">
                    {result}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
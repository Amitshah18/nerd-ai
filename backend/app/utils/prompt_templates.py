def boilerplate_prompt(feature: str) -> str:
    return f"Generate boilerplate code for the following feature:\n'{feature}'\nProvide clean and modular code in Python."

def test_case_prompt(code: str) -> str:
    return f"Write unit test cases in Python (using pytest) for the following function:\n{code}"

def documentation_prompt(code: str) -> str:
    return f"Generate documentation for the following code:\n{code}\nInclude description, usage, and parameters."

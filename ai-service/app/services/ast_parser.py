import tree_sitter_python as tspython
import tree_sitter_javascript as tsjavascript
import tree_sitter_cpp as tscpp
from tree_sitter import Language, Parser

class CodeParser:
    def __init__(self):
        # Setup Tree-sitter languages
        self.languages = {
            "python": Language(tspython.language()),
            "javascript": Language(tsjavascript.language()),
            "cpp": Language(tscpp.language()),
            "java": Language(tspython.language()) # Fallback for Java (using python parser for now)
        }

    def parse(self, code: str, language: str):
        lang = language.lower()
        if lang not in self.languages:
            lang = "python" # Default fallback
            
        # 🔥 FIX: Naye tree-sitter version mein Parser ko language ke sath initialize karte hain
        parser = Parser(self.languages[lang])
        tree = parser.parse(bytes(code, "utf8"))
        return tree, lang

    def extract_structure(self, code: str, language: str):
        tree, lang = self.parse(code, language)
        root = tree.root_node
        
        structure = {
            "functions": [],
            "classes": [],
            "loops_count": 0,
            "conditionals_count": 0,
            "imports": [],
            "variables": []
        }

        # Recursively traverse the tree
        def walk(node):
            node_type = node.type
            
            # Python mappings
            if lang == "python":
                if node_type == "function_definition":
                    structure["functions"].append(self._get_node_text(code, node))
                elif node_type == "class_definition":
                    structure["classes"].append(self._get_node_text(code, node))
                elif node_type in ["for_statement", "while_statement"]:
                    structure["loops_count"] += 1
                elif node_type == "if_statement":
                    structure["conditionals_count"] += 1
                elif node_type in ["import_statement", "import_from_statement"]:
                    structure["imports"].append(self._get_node_text(code, node))
            
            # JS/C++ mappings
            elif lang in ["javascript", "cpp"]:
                if node_type in ["function_declaration", "function_definition", "arrow_function"]:
                    structure["functions"].append(self._get_node_text(code, node))
                elif node_type in ["class_declaration", "class_specifier"]:
                    structure["classes"].append(self._get_node_text(code, node))
                elif node_type in ["for_statement", "for_in_statement", "while_statement", "do_statement"]:
                    structure["loops_count"] += 1
                elif node_type == "if_statement":
                    structure["conditionals_count"] += 1
                elif node_type in ["import_statement", "preproc_include"]:
                    structure["imports"].append(self._get_node_text(code, node))

            # Recursively walk children
            for child in node.children:
                walk(child)

        # Start walking from root
        walk(root)
        return structure

    def _get_node_text(self, code, node):
        # Get the first line of the function/class for naming
        text = code[node.start_byte:node.end_byte]
        first_line = text.split('\n')[0]
        return first_line[:50] # Limit length for display
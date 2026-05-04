import os
import re

def find_images_without_dimensions(root_dir):
    image_tag_pattern = re.compile(r'<Image\s+([^>]*?)/?>', re.DOTALL)
    width_pattern = re.compile(r'\bwidth\s*=\s*')
    height_pattern = re.compile(r'\bheight\s*=\s*')
    
    results = []

    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(('.jsx', '.tsx')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    matches = image_tag_pattern.finditer(content)
                    for match in matches:
                        tag_content = match.group(1)
                        has_width = width_pattern.search(tag_content)
                        has_height = height_pattern.search(tag_content)
                        
                        if not has_width or not has_height:
                            results.append({
                                'file': path,
                                'line': content.count('\n', 0, match.start()) + 1,
                                'tag': match.group(0),
                                'missing': 'both' if not has_width and not has_height else ('width' if not has_width else 'height')
                            })
    return results

if __name__ == "__main__":
    src_dir = r'd:\03.Code\06.JS\01.NextJS\NextJS_Project_phghuy\src'
    findings = find_images_without_dimensions(src_dir)
    for f in findings:
        print(f"{f['file']}:{f['line']} - Missing {f['missing']}")
        print(f"  {f['tag'].strip()}")

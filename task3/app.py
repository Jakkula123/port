from flask import Flask, send_file, request
import pythoncom
from win32com import client
import os
from bs4 import BeautifulSoup
import tempfile
import win32com.client

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('portfolio.html')

@app.route('/<path:filename>')
def serve_file(filename):
    return send_from_directory('.', filename)

@app.route('/download-resume', methods=['POST'])
def download_resume():
    try:
        # Initialize COM
        pythoncom.CoInitialize()
        
        # Create a Word application instance
        word = client.Dispatch("Word.Application")
        word.Visible = False
        
        # Create a new document
        doc = word.Documents.Add()
        
        # Read the resume.html content
        with open('resume.html', 'r', encoding='utf-8') as file:
            html_content = file.read()
        
        # Parse HTML and extract content
        soup = BeautifulSoup(html_content, 'html.parser')
        resume_content = soup.find('div', class_='resume-container')
        
        # Create a temporary HTML file with just the resume content
        temp_html = tempfile.NamedTemporaryFile(delete=False, suffix='.html')
        temp_html.write(str(resume_content).encode('utf-8'))
        temp_html.close()
        
        # Create a temporary file for the DOCX
        temp_docx = tempfile.NamedTemporaryFile(delete=False, suffix='.docx')
        temp_docx.close()
        
        try:
            # Convert HTML to DOCX
            word.Documents.Open(temp_html.name)
            doc = word.ActiveDocument
            doc.SaveAs2(temp_docx.name, FileFormat=16)  # 16 = DOCX format
            doc.Close()
            
            # Cleanup Word
            word.Quit()
            pythoncom.CoUninitialize()
            
            # Send the file
            return send_file(
                temp_docx.name,
                as_attachment=True,
                download_name='Sanjay_Jakkula_CV.docx',
                mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            )
            
        finally:
            # Cleanup temporary files
            try:
                os.unlink(temp_html.name)
                os.unlink(temp_docx.name)
            except:
                pass
            
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

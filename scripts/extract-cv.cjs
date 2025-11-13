const fs = require('node:fs');
const path = require('node:path');

const cvPath = path.resolve(process.cwd(), 'CVBrunoV.pdf');

(async () => {
  try {
    const { default: pdfDefault } = await import('pdf-parse');
    const pdf = pdfDefault;
    const dataBuffer = fs.readFileSync(cvPath);
    const data = await pdf(dataBuffer);
    const text = data.text || '';

    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const whole = lines.join('\n');

    const emailMatch = whole.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const phoneMatch = whole.match(/(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}/);
    const linkedinMatch = whole.match(/https?:\/\/([\w.-]*linkedin\.com\/[\w\-\/?=&#.%]+|linkedin\.com\/[\w\-\/?=&#.%]+)/i);
    const githubMatch = whole.match(/https?:\/\/(?:www\.)?github\.com\/[\w.-]+/i);
    const webMatch = whole.match(/https?:\/\/(?!.*(linkedin|github)\.com)[\w.-]+\.[a-z]{2,}(?:\/[\w\-\/?=&#.%]*)?/i);

    const name = (lines.find(l => /[A-Za-zÁÉÍÓÚáéíóúñÑ]/.test(l) && !/curriculum|cv/i.test(l)) || '').trim();

    const sections = {
      education: whole.match(/(educaci[óo]n|formaci[óo]n|education)[\s\S]*?(?=experiencia|experience|skills|habilidades|$)/i)?.[0] || '',
      experience: whole.match(/(experiencia|experience)[\s\S]*?(?=educaci[óo]n|formaci[óo]n|skills|habilidades|proyectos|$)/i)?.[0] || '',
      skills: whole.match(/(skills|habilidades|competencias)[\s\S]*?(?=experiencia|experience|educaci[óo]n|$)/i)?.[0] || '',
      projects: whole.match(/(proyectos|projects)[\s\S]*?(?=experiencia|education|skills|$)/i)?.[0] || ''
    };

    const result = {
      name,
      email: emailMatch?.[0] || null,
      phone: phoneMatch?.[0] || null,
      linkedin: linkedinMatch?.[0] || null,
      github: githubMatch?.[0] || null,
      website: webMatch?.[0] || null,
      sections,
      preview: lines.slice(0, 40)
    };

    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error leyendo el CV:', err);
    process.exit(1);
  }
})();
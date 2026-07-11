const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

export async function analyzeResume(
    resumeText: string,
    jobDescription: string
) {
    const prompt = `
You are an expert ATS Resume Analyzer.

Your task is to compare the candidate's resume with the provided job description.

Analyze both carefully.

Return ONLY valid JSON in the following format.

Return ONLY valid JSON.

{
  "atsScore":82,

  "matchScore":90,

  "breakdown":{
      "skills":90,
      "keywords":80,
      "projects":85,
      "education":100,
      "formatting":75
  },

  "sectionScores":{
      "skills":92,
      "projects":80,
      "experience":65,
      "education":100,
      "formatting":85
  },

  "sectionFeedback":{
      "skills":"...",
      "projects":"...",
      "experience":"...",
      "education":"...",
      "formatting":"..."
  },

  "summary":"",

  "strengths":[],

  "matchingSkills":[],

  "missingSkills":[],

  "foundKeywords":[],
"missingKeywords":[],

"resumeRewrite":[
   {
      "original":"",
      "improved":""
   }
],

"suggestions":[]

Scoring Rules

1. ATS Score
- Give an overall ATS score from 0-100.

2. Match Score
- Compare the resume with the Job Description.
- Return a score from 0-100.

3. ATS Breakdown
Return:

- skills
- keywords
- projects
- education
- formatting

Each should be scored from 0-100.

4. Resume Section Analysis

Return these five scores inside sectionScores.

- skills
- projects
- experience
- education
- formatting

Each must be an integer from 0-100.

5. Section Feedback

Inside sectionFeedback return one short improvement suggestion for EACH section.

Example:

"sectionFeedback":{
   "skills":"Mention more technical skills.",
   "projects":"Add measurable achievements.",
   "experience":"Include internships or freelance work.",
   "education":"Looks good.",
   "formatting":"Use consistent headings."
}

6. Matching Skills

Return skills that exist in BOTH the resume and the Job Description.

7. Missing Skills

Return important skills from the Job Description that are missing in the resume.

8. Keywords

foundKeywords:
Return important keywords found in BOTH.

missingKeywords:
Return important keywords missing from the resume.

9. Strengths

Return 4-6 strengths.

10. Suggestions

Return 4-6 practical suggestions.

11. Resume Rewrite

Identify 3–5 weak or generic resume statements.

Rewrite each statement professionally using strong action verbs and measurable language where appropriate.

Return them in this format:

"resumeRewrite":[
   {
      "original":"Built a website.",
      "improved":"Developed a responsive full-stack web application using React, Next.js, and Node.js."
   }
]

IMPORTANT:
- Never omit any field.
- Every field shown in the JSON schema must always be present.
- If information is unavailable, return an empty array [] or a score of 0.
- Return ONLY valid JSON.



=========================
JOB DESCRIPTION
=========================

${jobDescription}

=========================
RESUME
=========================

${resumeText}
`;

    const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "google/gemini-2.5-flash",

                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],

                temperature: 0.3,
                max_tokens: 1800,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const data = await response.json();

    return data.choices[0].message.content;
} 
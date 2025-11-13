// Fetch contributions via GitHub GraphQL using Actions token and write to public/contributions.json
// Run in CI before build. Requires env GITHUB_TOKEN

const fs = await import('fs/promises');

const USER = 'A00838521';
const OUT = new URL('../public/contributions.json', import.meta.url);

const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{weeks{contributionDays{date contributionCount}}}}}}`;

async function main(){
  const token = process.env.GITHUB_TOKEN;
  if(!token){
    console.error('No GITHUB_TOKEN provided');
    process.exit(0);
  }
  const res = await fetch('https://api.github.com/graphql',{
    method:'POST',
    headers:{
      Authorization:`Bearer ${token}`,
      'Content-Type':'application/json'
    },
    body: JSON.stringify({ query, variables: { login: USER } })
  });
  if(!res.ok){
    console.error('GraphQL request failed:', res.status, res.statusText);
    process.exit(0);
  }
  const json = await res.json();
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
  const simplified = weeks.map(w => w.contributionDays.map(d => ({ date: d.date, count: d.contributionCount })));
  await fs.mkdir(new URL('../public/', import.meta.url), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(simplified));
  console.log('Wrote contributions to public/contributions.json');
}

main().catch(err=>{ console.error(err); process.exit(0); });

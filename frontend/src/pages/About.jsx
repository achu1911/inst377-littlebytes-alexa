function About() {
  return (
    <div className="max-w-4xl mx-auto p-10 text-parisWine space-y-10">

      {/* Title */}
      <h1 className="text-6xl font-script font-bold text-center text-parisWine mb-6">
        About LittleBytes 
      </h1>

      {/* Intro */}
      <section className="bg-white/70 p-6 rounded-3xl shadow-md border border-parisRose/30 leading-relaxed text-lg">
        <p>
          Hi! I’m <span className="font-semibold">Alexa Chu</span>, a student in 
          <span className="font-semibold"> INST377</span>, and the creator of 
          <span className="italic"> LittleBytes</span>. This is a warm, beginner-friendly cooking companion 
          designed for students who want to cook smarter, spend less, and waste less food.
        </p>
      </section>

      {/* Problem Section */}
      <section className="bg-parisCream/60 p-6 rounded-3xl shadow-md border border-parisLavender/40 leading-relaxed text-lg">
        <h2 className="text-3xl font-semibold mb-3 text-parisWine">
          The Problem 🍽️
        </h2>
        <p className="mb-4">
          College students and young adults often struggle with planning meals on limited 
          budgets, tight schedules, and unpredictable pantry ingredients. Many buy groceries 
          without a plan, leading to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Food waste from forgotten or unused ingredients</li>
          <li>Overspending due to poor planning</li>
          <li>Relying on unhealthy or expensive takeout</li>
          <li>Stress from not knowing what to cook</li>
        </ul>

        <p className="mt-4">
          These challenges make it harder for students to maintain healthy eating habits 
          while juggling academics, work, and social life.
        </p>
      </section>

      {/* Stakeholders */}
      <section className="bg-white/70 p-6 rounded-3xl shadow-md border border-parisRose/30 leading-relaxed text-lg">
        <h2 className="text-3xl font-semibold mb-3">
          Who LittleBytes Helps 💡
        </h2>
        <p>
          The primary users are college students living in dorms or apartments who want to 
          stretch their groceries while cooking real meals. Secondary users include:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Student organizations promoting wellness & nutrition</li>
          <li>Campus dining programs reducing food waste</li>
          <li>Young professionals learning how to cook on a budget</li>
        </ul>
        <p className="mt-3">
          LittleBytes supports anyone trying to save money, reduce waste, and eat more intentionally.
        </p>
      </section>

      {/* Solution Section */}
      <section className="bg-parisCream/60 p-6 rounded-3xl shadow-md border border-parisLavender/40 leading-relaxed text-lg">
        <h2 className="text-3xl font-semibold mb-3 text-parisWine">
          The LittleBytes Solution 🍳
        </h2>
        <p className="mb-4">
          LittleBytes helps users turn what they already have into real, tasty meals. The app:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Recommends recipes based on ingredients users already have</li>
          <li>Provides step-by-step cooking instructions and images</li>
          <li>Saves favorite recipes for easy access</li>
          <li>Helps organize meals for the week</li>
          <li>Reduces food waste through smart ingredient usage</li>
          <li>Supports budgeting by showing meal cost estimates</li>
        </ul>

        <p className="mt-4">
          Using TheMealDB API, the system pulls real, detailed recipes and filters them 
          by ingredients, diet, or preference, transforming “What do I make?” into 
          simple, inspiring guidance.
        </p>
      </section>

      {/* Tech Section */}
      <section className="bg-white/70 p-6 rounded-3xl shadow-md border border-parisRose/30 leading-relaxed text-lg">
        <h2 className="text-3xl font-semibold mb-3">
          Technology Behind the App 🛠️
        </h2>
        <p className="mb-4">
          LittleBytes is built with modern web technologies that ensure a smooth, fast, and 
          responsive experience:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-semibold">React</span> for dynamic components and a clean UI</li>
          <li><span className="font-semibold">Tailwind CSS</span> for a warm, inviting aesthetic</li>
          <li><span className="font-semibold">Node.js Serverless Functions (Vercel)</span> for the backend logic & API routing</li>
          <li><span className="font-semibold">Supabase</span> to store saved recipes and user data</li>
          <li><span className="font-semibold">React Router</span> for seamless multi-page navigation</li>
          <li><span className="font-semibold">TheMealDB API</span> for real recipe data</li>
        </ul>

        <p className="mt-4">
          These tools come together to create a student-friendly app that’s practical, 
          reliable, and enjoyable to use. My goal is to build a cozy and intuitive 
          experience that encourages users to cook more confidently and creatively.
        </p>
      </section>

    </div>
  );
}

export default About;

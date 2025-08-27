export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-16">
      <div className="container-af py-10 text-sm text-zinc-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="tampron text-white">Airflow</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">GitHub</a>
          <a href="#" className="hover:text-white">Privacy</a>
        </nav>
      </div>
    </footer>
  )
}



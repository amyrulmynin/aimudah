export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-3">AIMudah</h3>
            <p className="text-sm">
              AI API Proxy murah untuk developer Malaysia. Satu key, 10+ model.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Produk</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#models" className="hover:text-white transition">Model</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Harga</a></li>
              <li><a href="/docs" className="hover:text-white transition">Dokumentasi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Syarikat</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/terms" className="hover:text-white transition">Terma Perkhidmatan</a></li>
              <li><a href="/privacy" className="hover:text-white transition">Polisi Privasi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Komuniti</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://t.me/aimudah" className="hover:text-white transition">Telegram</a></li>
              <li><a href="mailto:support@aimudah.my.id" className="hover:text-white transition">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} AIMudah. Hak cipta terpelihara.
        </div>
      </div>
    </footer>
  );
}

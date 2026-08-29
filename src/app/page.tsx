export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-background/50 border border-foreground/10 rounded-2xl p-8 shadow-sm mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 text-center">أهلاً بك في يحدث الآن 24</h1>
        <p className="text-lg text-foreground/80 text-center max-w-2xl mx-auto">
          الموقع الإخباري الأول المختص بنقل الصورة كاملة بموضوعية واحترافية. تابع أحدث الأخبار السياسية والاقتصادية والرياضية.
        </p>
      </section>

      {/* Grid of mock news */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <article key={i} className="bg-background border border-foreground/10 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
            <div className="h-48 bg-foreground/5 w-full flex items-center justify-center">
              <span className="text-foreground/40 font-medium">صورة الخبر</span>
            </div>
            <div className="p-5">
              <span className="inline-block px-2 py-1 bg-urgent/10 text-urgent text-xs font-bold rounded mb-3">
                عاجل
              </span>
              <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                عنوان خبر تجريبي ومثال للتصميم العصري {i}
              </h2>
              <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                تفاصيل الخبر التجريبي تعرض هنا، حيث يمكنك قراءة ملخص سريع للأحداث والمستجدات على الساحة بأسلوب صحفي متميز.
              </p>
              <span className="text-xs text-foreground/50">منذ ساعتين</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

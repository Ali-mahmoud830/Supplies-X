import { getLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Database, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PrivacyPage() {
  const locale = await getLocale();
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative">
      <Navbar />
      
      <main className="flex-1 relative z-10 pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-sm p-8 sm:p-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 shrink-0">
              <ShieldCheck className="h-6 w-6 text-amber-500" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {isAr ? "سياسة الخصوصية وأمن البيانات" : "Privacy Policy & Data Security"}
            </h1>
          </div>

          <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed">
            <p className="text-lg font-medium">
              {isAr 
                ? "في شركة Supplies X، ندرك أن البيانات المؤسسية والمعلومات التجارية هي أصول استراتيجية حساسة. تم تصميم بنية الخصوصية لدينا لضمان سرية وحماية مطلقة للمعلومات الخاصة بالعملاء وعمليات الشراء." 
                : "At Supplies X, we recognize that corporate data and commercial information are sensitive strategic assets. Our privacy architecture is designed to ensure absolute confidentiality and protection of client information and procurement operations."}
            </p>

            <div className="my-12 space-y-12">
              {/* Section 1 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-5 w-5 text-amber-500" />
                  <h2 className="text-2xl font-bold m-0">{isAr ? "1. جمع البيانات والمصادقة التجارية" : "1. Data Collection & Commercial Authentication"}</h2>
                </div>
                <p>
                  {isAr 
                    ? "نحن نجمع البيانات الضرورية لتنفيذ المعاملات المؤسسية B2B. يشمل ذلك السجلات التجارية، البطاقات الضريبية، وتفاصيل مديري المشتريات. تتم معالجة جميع الوثائق الحساسة عبر طبقات تشفير متقدمة ولا يتم تخزينها في نصوص واضحة. نضمن التزامنا الكامل بحماية هويات المؤسسات ومنع أي تسريب لمعلومات الموردين أو المشترين."
                    : "We exclusively collect data necessary to execute B2B corporate transactions. This includes Commercial Registrations, Tax IDs, and procurement manager details. All sensitive documentation is processed through advanced encryption layers and is never stored in plaintext. We ensure full compliance in protecting corporate identities and preventing any leakage of supplier or buyer information."}
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-5 w-5 text-amber-500" />
                  <h2 className="text-2xl font-bold m-0">{isAr ? "2. حماية ملفات طلبات الشراء (BOM) والمستندات" : "2. BOM & File Protection"}</h2>
                </div>
                <p>
                  {isAr
                    ? "أي جداول كميات (BOM) أو ملفات هندسية بصيغة Excel أو PDF يتم رفعها على منصتنا لطلب عروض الأسعار (RFQ) تعتبر وثائق سرية للغاية (Confidential). نقوم بتطبيق معايير اتفاقية عدم الإفصاح (NDA) المؤسسية تلقائياً على كافة الملفات المرفوعة. النظام مقيد بصلاحيات وصول صارمة تمنع أي جهة غير مصرح لها من الاطلاع على تفاصيل مشاريعكم."
                    : "Any Bill of Materials (BOM) or engineering files uploaded in Excel or PDF formats for Request for Quotes (RFQ) are considered strictly confidential. We automatically apply corporate Non-Disclosure Agreement (NDA) standards to all uploaded files. Our system enforces strict access controls preventing unauthorized entities from viewing your project details."}
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="h-5 w-5 text-amber-500" />
                  <h2 className="text-2xl font-bold m-0">{isAr ? "3. سياسة عدم المشاركة مع الأطراف الثالثة" : "3. Absolute Zero Third-Party Sharing"}</h2>
                </div>
                <p>
                  {isAr
                    ? "تتبنى شركة Supplies X سياسة الرفض القاطع للمتاجرة بالبيانات. نحن لا نقوم ببيع، أو تأجير، أو مشاركة بيانات شركتكم، سجلات طلباتكم، أو اتجاهات الشراء الخاصة بكم مع أي بائعين خارجيين أو منصات تسويق. تتم مشاركة البيانات فقط مع شركاء الخدمات اللوجستية المعتمدين بالقدر الذي يتطلبه تنفيذ وتسليم الطلبات حصراً."
                    : "Supplies X adopts a strict zero-data-commercialization policy. We do not sell, rent, or share your corporate data, order history, or procurement trends with any external vendors or marketing platforms. Data is solely shared with certified logistics partners strictly to the extent required to execute and fulfill your orders."}
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 text-sm text-slate-500">
              {isAr ? "آخر تحديث: 30 مايو 2026" : "Last Updated: May 30, 2026"}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

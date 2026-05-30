import { getLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FileText, Anchor, Scale } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function TermsPage() {
  const locale = await getLocale();
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative">
      <Navbar />
      
      <main className="flex-1 relative z-10 pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-sm p-8 sm:p-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
              <Scale className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {isAr ? "الشروط والأحكام التجارية" : "Corporate Terms & Conditions"}
            </h1>
          </div>

          <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed">
            <p className="text-lg font-medium">
              {isAr 
                ? "تحكم هذه الشروط والأحكام كافة العمليات التجارية والتعاقدات التي تتم عبر منصة Supplies X. من خلال استخدامك للخدمة وتقديم طلبات الشراء، فإنك تقر كممثل قانوني مفوض للمؤسسة بقبول هذه الشروط التجارية الصارمة." 
                : "These Terms and Conditions govern all commercial operations and contracts executed through the Supplies X platform. By utilizing the service and submitting procurement requests, you acknowledge, as an authorized legal representative of your corporation, the acceptance of these strict commercial terms."}
            </p>

            <div className="my-12 space-y-12">
              {/* Section 1 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h2 className="text-2xl font-bold m-0">{isAr ? "1. طلبات عروض الأسعار (RFQ) والتسعير" : "1. Request for Quotes (RFQ) & Pricing Validation"}</h2>
                </div>
                <p>
                  {isAr 
                    ? "يعتبر إرسال طلب عرض أسعار (RFQ) عبر المنصة بمثابة دعوة للتعاقد وليس عقداً ملزماً. جميع الأسعار المبدئية خاضعة للمراجعة والتدقيق اليدوي من قبل مديري الحسابات لدينا لضمان توافر المخزون وتحديثات أسعار الصرف. لا يتم إبرام أي عقد توريد رسمي إلا بعد إصدار الفاتورة الأولية المعتمدة وتوقيع أمر التوريد النهائي من كلا الطرفين."
                    : "The submission of a Request for Quote (RFQ) via the platform constitutes an invitation to treat, not a legally binding contract. All preliminary pricing is subject to manual validation and auditing by our Account Managers to ensure inventory availability and exchange rate accuracy. No formal supply contract is executed until a validated Proforma Invoice is issued and the final Purchase Order is countersigned."}
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Anchor className="h-5 w-5 text-blue-600" />
                  <h2 className="text-2xl font-bold m-0">{isAr ? "2. سلاسل التوريد والقوة القاهرة" : "2. Supply Chains & Force Majeure"}</h2>
                </div>
                <p>
                  {isAr
                    ? "نلتزم بتنفيذ الجداول الزمنية المتفق عليها للتوريد، ولكننا نطبق بنود القوة القاهرة (Force Majeure) المعترف بها في قانون التجارة المصري والدولي. في حالات التأخير الناتجة عن أزمات الملاحة الدولية، الكوارث الطبيعية، التغيرات الجمركية المفاجئة، أو الاضطرابات اللوجستية القاهرة، لا تتحمل Supplies X أي غرامات تأخير استثنائية خارج إطار التعويض المشمول في العقد الرسمي للتوريد."
                    : "We are committed to fulfilling agreed-upon supply timelines; however, we enforce standard Force Majeure clauses recognized under Egyptian Commercial and International Trade Law. In instances of delays caused by global shipping disruptions, natural disasters, sudden customs interventions, or paramount logistical turbulence, Supplies X bears no exceptional delay penalties beyond the specific framework documented in the formal supply contract."}
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="h-5 w-5 text-blue-600" />
                  <h2 className="text-2xl font-bold m-0">{isAr ? "3. الملكية الفكرية والهيكل البرمجي" : "3. Proprietary Intellectual Property"}</h2>
                </div>
                <p>
                  {isAr
                    ? "تعد منصة Supplies X، بما في ذلك هيكل الكتالوج، واجهات المستخدم، قواعد البيانات، والخوارزميات التشغيلية، ملكية فكرية حصرية (Proprietary Architecture). يُحظر تماماً أي نسخ، هندسة عكسية، أو استخراج آلي للبيانات (Data Scraping). سيتم اتخاذ إجراءات قانونية فورية ضد أي أطراف تحاول استنساخ البنية المؤسسية أو تسعيراتها للمنافسة غير المشروعة."
                    : "The Supplies X platform, including its catalog structure, user interfaces, databases, and operational algorithms, represents strictly Proprietary Architecture. Any reproduction, reverse-engineering, or automated data scraping is explicitly prohibited. Immediate and aggressive legal action will be pursued against any entities attempting to clone the corporate infrastructure or exfiltrate pricing data for unfair competition."}
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

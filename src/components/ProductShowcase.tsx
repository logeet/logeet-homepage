import { Eyebrow } from "./Eyebrow";
import { ProductMockup } from "./ProductMockup";

export function ProductShowcase() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Eyebrow>자체 개발 시스템</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.6rem]">
          정산서 한 장으로 끝나지 않습니다.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-steel sm:text-lg">
          대부분의 물류 대행은 정산서로 끝나지만, 로지트는 그 안의 숫자를
          매달 예산과 견주어 보여드리는 대시보드를 직접 만들어 운영합니다.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-2xl px-5 sm:px-8">
        <div className="rise-in">
          <ProductMockup />
        </div>
        <p className="mt-4 text-center text-[13px] text-steel-soft">
          실제 화면을 단순화한 예시입니다
        </p>
      </div>
    </section>
  );
}

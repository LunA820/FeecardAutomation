import { Feecard } from '../types/feecard';
import './RateTest.css';

const RateTest = (props: { term: number | null, creditCategory: string | null, feecard: Feecard | null }) => {
  const credit: string = props.creditCategory ?? '';
  const term: number = props.term ?? -1;

  const dataMatch = props.feecard?.filter(f => f.creditCategory === credit && f.terms.includes(term));
  const rateMatch = dataMatch?.[0]?.rate;

  return (
    <div className="rate-test-container">
      <div className="rate-test-label">
        With the selected term and Credit category, interest rate should be:
      </div>
      <div className="rate-test-result">
        {rateMatch !== undefined ? rateMatch : '-'}
      </div>
    </div>
  );
};

export default RateTest;

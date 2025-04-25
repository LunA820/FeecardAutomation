import './FeecardReviewPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

type FeecardRow = {
  creditCategory: string,
  terms: number[],
  rate: number
}

type Feecard = FeecardRow[];

const FeecardReviewPage = () => {
  const [feecard, setFeecard] = useState<Feecard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchSuccess, setFetchSuccess] = useState<boolean | null>(null);

  const getUrl = 'https://nmji2zb182.execute-api.ap-southeast-2.amazonaws.com/FeecardAPI/FeecardDownload';

  useEffect(() => {
    const loadFeecard = async () => {
      try {
        const response = await axios.get(getUrl);
        setLoading(false);

        if (response.status !== 200) {
          setFetchSuccess(false);
        } else {
          setFetchSuccess(true);
          setFeecard(response.data);
        }
      } catch {
        setLoading(false);
        setFetchSuccess(false);
        setFeecard(null);
      }
    };

    loadFeecard();
  }, []);

  const availableTerms = getAvailableTerms(feecard);
  const creditCategories = getCreditCategories(feecard);

  return (
    <div className="review-container">
      <h1 className="page-title">Latest Feecard Review</h1>
      <div className="section-divider"></div>
      {loading ? (
        <div>Loading latest feecard ...</div>
      ) : (
        <div>
          {!fetchSuccess && <div>Failed to load feecard.</div>}
          {fetchSuccess && (
            <>
              <div className="section">
                <div className="section-title">Latest feecard available terms:</div>
                <DataDisplay data={availableTerms} />
              </div>

              <div className="section">
                <div className="section-title">Latest feecard available credit categories:</div>
                <DataDisplay data={creditCategories} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const DataDisplay = (props: { data: number[] | string[] }) => {
  return (
    <div className="data-list">
      {props.data.map(item => (
        <span className="data-item" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
};

const getAvailableTerms = (feecard: Feecard | null): number[] =>
  Array.from(new Set(feecard?.flatMap(f => f.terms) ?? [])).sort((a, b) => a - b);

const getCreditCategories = (feecard: Feecard | null): string[] =>
  Array.from(new Set(feecard?.map(f => f.creditCategory) ?? []));

export default FeecardReviewPage;

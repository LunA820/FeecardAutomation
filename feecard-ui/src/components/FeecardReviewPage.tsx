import { useEffect, useState } from 'react';
import axios from 'axios';
import { Feecard } from '../types/feecard';
import RateTest from './RateTest';
import './FeecardReviewPage.css';

const getUrl = 'https://nmji2zb182.execute-api.ap-southeast-2.amazonaws.com/FeecardAPI/FeecardDownload';

const FeecardReviewPage = () => {
  const [feecard, setFeecard] = useState<Feecard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchSuccess, setFetchSuccess] = useState<boolean | null>(null);

  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [selectedCreditCategory, setSelectedCreditCategory] = useState<string | null>(null);

  const selectOnClick = (selectData: number | string) => {
    if (typeof selectData === 'string'){
      setSelectedCreditCategory(selectData)
    }
    else{
      setSelectedTerm(selectData)
    }
  }

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

      {loading && <div>Loading latest feecard ...</div>}

      {!loading &&
        <div>
          {!fetchSuccess && <div>Failed to load feecard.</div>}
          {fetchSuccess && (
            <>
              <DataDisplay
                data={availableTerms}
                title="Latest feecard available terms"
                onSelect={selectOnClick}
                selectedItem={selectedTerm}
              />
              <DataDisplay
                data={creditCategories}
                title="Latest feecard available credit categories"
                onSelect={selectOnClick}
                selectedItem={selectedCreditCategory}
              />
              <RateTest term={selectedTerm} creditCategory={selectedCreditCategory} feecard={feecard}/>
            </>
          )}
        </div>
      }
    </div>
  );
};

const DataDisplay = (props: {
  data: number[] | string[],
  title: string,
  onSelect: (item: number | string) => void,
  selectedItem: number | string | null
}) => {
  return (
    <div className="section">
      <div className="section-title">{props.title}</div>
      <div className="data-list">
        {props.data.map(item => (
          <button
            key={item.toString()}
            className={item === props.selectedItem ? 'data-button selected' : 'data-button'}
            onClick={() => props.onSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};


const getAvailableTerms = (feecard: Feecard | null): number[] =>
  Array.from(new Set(feecard?.flatMap(f => f.terms) ?? [])).sort((a, b) => a - b);

const getCreditCategories = (feecard: Feecard | null): string[] =>
  Array.from(new Set(feecard?.map(f => f.creditCategory) ?? []));

export default FeecardReviewPage;

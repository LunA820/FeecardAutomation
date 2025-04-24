import { useEffect, useState } from 'react';
import axios from 'axios';

const FeecardReviewPage = () => {
  const [feecard, setFeecard] = useState<JSON | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState<boolean | null>(null);

  const getUrl = 'https://nmji2zb182.execute-api.ap-southeast-2.amazonaws.com/FeecardAPI/FeecardDownload';

  useEffect(() => {
    const loadFeecard = async () => {
      try {
        const response = await axios.get(getUrl);
        console.log(response.data);

        if (response.status !== 200) {
          setFetchSuccess(false);
        } else {
          setFetchSuccess(true);
          setFeecard(response.data);
        }
      } catch {
        setFetchSuccess(false);
        setFeecard(null);
      }
    };

    loadFeecard();
  }, []); // <-- empty dependency array = only run once

  return (
    <>
      {!fetchSuccess && <div>Failed to load feecard.</div>}
      {fetchSuccess && <pre>{JSON.stringify(feecard, null, 2)}</pre>}
    </>
  );
};

export default FeecardReviewPage;

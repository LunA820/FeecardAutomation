from typing import List, Dict, Tuple
from collections import defaultdict

def parse_csv_matrix(raw_csv: str) -> List[Dict[str, object]]:
    lines = raw_csv.strip().split("\r\n")
    if not lines:
        return []

    # Extract terms from header row
    headers = lines[0].split(",")[1:]  # skip first empty cell
    terms = [int(term.strip()) for term in headers]

    grouped = defaultdict(list)  # key: (creditCategory, rate), value: list of terms

    # Parse each row
    for line in lines[1:]:
        parts = line.split(",")
        credit_category = parts[0].strip()
        rates = parts[1:]

        for i, rate_str in enumerate(rates):
            rate = float(rate_str.strip().replace("%", ""))
            key: Tuple[str, float] = (credit_category, rate)
            grouped[key].append(terms[i])

    # Convert grouped results to desired format
    results: List[Dict[str, object]] = [
        {
            "creditCategory": credit_category,
            "terms": sorted(term_list),
            "rate": rate
        }
        for (credit_category, rate), term_list in grouped.items()
    ]

    #print(results)
    return results

#parse_csv_matrix(",12,24,36,48,60,72,84,120\r\nA,1.20%,1.20%,1.20%,2.40%,3.60%,3.60%,3.60%,4.00%\r\nB,2.40%,2.40%,2.40%,3.00%,3.00%,3.00%,4.00%,5.00%\r\nC,3.00%,4.00%,4.00%,4.00%,4.00%,4.00%,4.00%,4.00%\r\nD,3.00%,6.00%,6.00%,6.00%,7.00%,8.00%,9.00%,10.00%\r\nE,1.20%,1.20%,1.20%,2.40%,3.60%,3.60%,3.60%,4.00%\r\nF,2.40%,2.40%,2.40%,3.00%,3.00%,3.00%,4.00%,5.00%\r\nG,3.00%,4.00%,4.00%,4.00%,4.00%,4.00%,4.00%,4.00%\r\nH,3.00%,6.00%,6.00%,6.00%,7.00%,8.00%,9.00%,10.00%")
import os
import pandas as pd
import re
import json

# Get the current script's directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the data file
data_path = os.path.join(current_dir, '..', '..', 'data', 'ai_tinkerers_data.csv')

# Read the CSV file
df = pd.read_csv(data_path)

# Split the dataframe into two parts
df_first_105 = df.iloc[:105].copy()
df_rest = df.iloc[105:].copy()

# Function to extract just the name from the Name column
def extract_name(name_string):
    if isinstance(name_string, float):
        return ''
    
    # Updated regex to match first and last name only
    match = re.match(r'^(\w+(?:\s+\w+)?)', name_string.strip())
    if match:
        extracted_name = match.group(1)
        print(f"Matched: '{name_string}' -> '{extracted_name}'")
        return extracted_name
    print(f"No match: '{name_string}'")
    return ''

# Apply the function to create a new column with just the name
df_first_105['Extracted_Name'] = df_first_105['Name'].apply(extract_name)

# Ensure all columns from df_rest are included in the merge
columns_to_use = df_rest.columns.tolist()

# Before the merge, clean up the name columns
df_first_105['Extracted_Name'] = df_first_105['Extracted_Name'].str.strip().str.lower()
df_rest['name'] = df_rest['name'].str.strip().str.lower()

print("\nSample of cleaned Extracted_Name from df_first_105:")
print(df_first_105['Extracted_Name'].head())

print("\nSample of cleaned 'name' from df_rest:")
print(df_rest['name'].head())

# Perform the merge with cleaned names
result = pd.merge(df_first_105, df_rest, 
                  left_on='Extracted_Name', right_on='name', 
                  how='left', suffixes=('', '_y'))

# Remove specified columns, including duplicates
columns_to_remove = ['name', 'linkedin', 'linkedin-href', 'twitter', 'twitter-href', 
                     'linkedin_name', 'mutual_connections', 'twitter_bio', 'tweets',
                     'Action', 'Info', 'Name', 'page', 
                     'web-scraper-start-url', 'web-scraper-order']  # Dropped columns
result = result.drop(columns=columns_to_remove, errors='ignore')

# Remove '_y' suffix from column names
result.columns = result.columns.str.replace('_y$', '', regex=True)

# Print the final column names
print("\nFinal columns in the merged dataframe:")
print(result.columns)

# Check for non-null values in these columns
if 'twitter_bio' in result.columns:
    print(f"\nNumber of non-null values in 'twitter_bio': {result['twitter_bio'].notna().sum()}")
if 'tweets' in result.columns:
    print(f"Number of non-null values in 'tweets': {result['tweets'].notna().sum()}")

# Save the result to a CSV file to inspect
result.to_csv('merged_result.csv', index=False)
print("\nCleaned merged result saved to 'merged_result.csv'")

# Optional: Print the first few rows of the result
print("\nFirst few rows of the cleaned merged result:")
print(result.head())

# Function to parse tweets
def parse_tweets(tweets_string):
    if pd.isna(tweets_string):
        return []
    return [tweet.strip() for tweet in tweets_string.split('\n') if tweet.strip()]

# Parse tweets and create JSON data
json_data = []
for _, row in result.iterrows():
    # Create a dictionary for each row, including all columns and parsed tweets
    row_data = {
        'name': row['Extracted_Name'],
        'tweets': parse_tweets(row.get('tweets', ''))
    }
    # Add other columns to the row_data dictionary, excluding NaN values and specific fields
    for col in result.columns:
        if col not in ['Extracted_Name', 'tweets', 'web-scraper-order', 'web-scraper-start-url']:  # Exclude specified fields
            value = row[col]
            if pd.notna(value):  # Only add if the value is not NaN
                row_data[col] = value
    json_data.append(row_data)

# Save the parsed tweets to a JSON file
json_path = os.path.join(current_dir, 'parsed_tweets.json')
with open(json_path, 'w') as f:
    json.dump(json_data, f, indent=2)

print(f"Parsed tweets saved to: {json_path}")
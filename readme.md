# AdThrive Code Test
AdThrive Code Test is a program that will find top posts in a given csv of posts

## Top Post
A post is only a top post if it matches this criteria:
* The post must be public 
* The post must have over 10 comments and over 9000 views
* The post title must be under 40 characters

## Installtion
```
git clone 
npm install
```

## Quick Start
Running this command will find the top posts in the given csv and output it to a file at /results/top_posts.csv. It will also output the other, non-top, posts to a file at /results/other_posts.csv.
```
npm install
npm start
```

## Options
Various options are available to recieve the top posts in a format that you like. These options are expected to be environment variables. For example, the following command will execute the program and output a top post for Oct-04-2015 in addition to top posts and other posts. The output will be in JSON, and the full record will be included.
```
DAY=Oct-04-2015 OUTPUT=json MODE=detailed npm start
```
* OUTPUT: csv | json - defaults to csv
* MODE: minimal | detailed - defaults to minimal
* POSTS_FILEPATH - the file path of the csv of posts. Defaults to ````${__dirname}/posts.csv````
* OUTPUT_DEST - the output destination folder to write the result files to. Defaults to ````${__dirname}/results/````
* DATE_FORMAT - The date format to compare the post's timestamp to a day that also follows this format. Defaults to ````MMM-DD-YYYY````
* DAY - The day to find the top post for. Must be the same format as DATE_FORMAT. Defaults to Today. For Example: ````Oct-04-2015````

## Tests
To run the tests and coverage, run the command:
```
npm test
```

## Dependencies
node: >=7.6.0 (async/await support)


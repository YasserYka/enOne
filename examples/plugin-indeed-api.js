
card.title(card.anchor("https://opensource.indeedeng.io/api-documentation/" ,"Indeed API"));

card.image("jobs.jpg");

card.color(colors.DARK);

card.table(
    [    
        {
            "jobtitle":"Java Developer",
            "company":"Initech",
            "city":"Austin",
            "date":"Mon, 02 Aug 2020 10:21:44 GMT",
            "url": card.anchor("https://jobposturl.com/java_developer", "The URL")
        },
        {   
            "jobtitle":"Backend Developer",
            "company":"Acme Corporation",
            "city":"NYC",
            "date":"Fri, 05 Sep 2020 16:21:01 GMT",
            "url":"https://jobposturl.com/backend_developer"
        },
        {
            "jobtitle":"Python Developer",
            "company":"Hooli",
            "city":"Dayton",
            "date":"Mon, 02 Aug 2020 11:12:40 GMT",
            "url": card.anchor("https://jobposturl.com/python_developer", "Post URL")
        },
        {   
            "jobtitle":"Data Scientist",
            "company":"Massive Dynamic",
            "city":"Madison",
            "date":"Sat, 02 Oct 2020 02:08:58 GMT",
            "url":"https://jobposturl.com/data_scientist"
        },
    ]
);

card.body(card.paragraph("Indeed's jobs in the last 24H"));

card.footer(card.mutedText("Creator: H3xo0"));
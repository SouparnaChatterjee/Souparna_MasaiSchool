const logs = [
  { user: "Alice", duration: 5, activity: "Search" },
  { user: "Bob", duration: 3, activity: "View Product" },
  { user: "Alice", duration: 2, activity: "Add to Cart" },
  { user: "Charlie", duration: 7, activity: "Checkout" },
  { user: "Bob", duration: 1, activity: "Search" },
  { user: "Charlie", duration: 4, activity: "View Product" },
];

document.getElementById('datasetDisplay').textCoontent=JSON.stringify(logs, null, 2);
function analyzeUserActivity()
{
    const totalDurationPerUser=logs.reduce((acc,log)=>{
        acc[log.user]=(acc[log.user]||0)+log.duration;
        return acc;
    }, {});

    const activeUsers=Object.entries(totalDurationPerUser)
    .filter(([user,duration])=>duration>5)
    .map(([user,duration])=>user);
    
    const totalDuration=logs.reduce((sum, log)=>sum+log.duration,0);
    const avgSessionDuration=totalDuration/logs.length;

    return 
    {
        totalDurationPerUser,
        activeUsers,
        avgSessionDuration= parseFloat(avgSessionDuration.toFixed(2))
    };
}

setTimeout(()=>{
    const results=analyzeUserActivity();
    const resultsHTML=`
     <div class="metric">
            <span class="metric-icon"> $ </span>
            <strong>totalDurationPerUser</strong> $(JSON.stringify(results.totalDurationPerUser))
    </div>
     <div class="metric">
            <span class="metric-icon"> $ </span>
            <strong>totalDurationPerUser</strong> $(JSON.stringify(results.totalDurationPerUser))
        </div>
     <div class="metric">
            <span class="metric-icon"> $ </span>
            <strong>totalDurationPerUser</strong> ${results.avgSessionDuration} mins 
        </div>
    `;
    document.getElementById('loadingText').style.display='none';
    document.getElementById('results').style.display='block';
    document.getElementById('results').innerHTML='resultsHTML';

    console.log('total duration per user:', results.totalDurationPerUser);
    console.log('users with >5mins duration:', results.activeUsers);
    console.log('Avg session duration:', results.avgSessionDuration+'mins');

}, 2000);

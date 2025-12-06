export const transactions = {
  init: async () => {
    console.log('Transactions')

    new DataTable('#table');

    if (data && data.length !== 0) {
      // Get the graph container HTML element.
      const graphContainer = document.getElementById("gitgraph");
      // Instantiate the graph.
      const gitgraph = GitgraphJS.createGitgraph(graphContainer, { orientation: 'vertical-reverse' });

      const master = gitgraph.branch('Wallet');
      master.commit(
        {
          subject: "Start transactions",
        });

      // debugger

      const map = new Map();

      data.forEach((t, i) => {
        //if (i <= 24) {



          if (map.has(t.baseAsset)) {
            //chiude operazione
            let branch = map.get(t.baseAsset)
            branch.commit(
              {
                tag: t.date || 'pippo',
                subject: `${t.type} ${t.baseAsset} Q.ty ${t.filled}`,
                body: `Price: ${t.orderPrice}`,
              });
          } else {
            //apre nuova operazione
            let branch = master.branch(t.baseAsset);
            branch.commit(
              {
                tag: t.date || 'baudo',
                subject: `${t.type} ${t.baseAsset} Q.ty ${t.filled}`,
                body: `Price: ${t.orderPrice}`,
              });

            map.set(t.baseAsset, branch);
          }

          


        //}
        // const transaction = master.branch(t.baseAsset);
        // transaction.commit(
        //   {
        //     tag: t.filled,
        //     subject: `${t.date}`
        //   });

      });

      // const master = gitgraph.branch('Wallet');
      // master.commit(
      //     {
      //       subject: "Init",
      //     });
      // const transaction = master.branch('transazione');
      // transaction.commit(
      //     {
      //       subject: "Transaction",
      //     });
      // master.merge(transaction).tag("v1.0.0");



      // const uno = gitgraph.branch('UNO');
      // uno.commit(
      //     {
      //       subject: "Init",
      //     });
      // const due = uno.branch('transazione');
      // due.commit(
      //     {
      //       subject: "Transaction",
      //     });
      // uno.merge(due).tag("v1.0.0");

    }





    // Simulate git commands with Gitgraph API.

    // master.commit(
    //   {
    //     subject: "Add feature",
    //     body: "More details about the feature…",
    //     dotText: "❤️",
    //     tag: "€",
    //     style: {
    //       // Specific style for this commit
    //     }
    //   });

    // const develop = master.branch("develop");
    // develop.commit("Add TypeScript");

    // const aFeature = develop.branch("a-feature");
    // aFeature
    //   .commit("Make it work")
    //   .commit("Make it right")
    //   .commit("Make it fast");

    // develop.merge(aFeature);
    // develop.commit("Prepare v1");

    // master.merge(develop).tag("v1.0.0");
  }
}

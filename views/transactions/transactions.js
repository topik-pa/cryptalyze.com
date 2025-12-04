export const transactions = {
  init: async () => {
    console.log('Transactions')

    new DataTable('#table');

    if(data && data.length !== 0) {
      // Get the graph container HTML element.
      const graphContainer = document.getElementById("gitgraph");
      // Instantiate the graph.
      const gitgraph = GitgraphJS.createGitgraph(graphContainer, {});

      const master = gitgraph.branch(data[0].quoteAsset);
      data.forEach((t, i) => {
        if(i===0) {
          master.commit(
          {
            subject: "First transaction",
          });
        }
        const transaction = master.branch(t.baseAsset);
        transaction.commit(
          {
            tag: t.filled,
            subject: `${t.date}`
          });

      });
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

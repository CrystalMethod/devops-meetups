import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

// Get configuration for the stack
const config = new pulumi.Config();
const region = config.get("region") as digitalocean.Region;
const nodeCount = config.getNumber("nodeCount");
const size = config.get("size") as digitalocean.DropletSlug;

const cluster = new digitalocean.KubernetesCluster("do-cluster", {
  region: region,
  version: "1.15.5-do.0",
  nodePool: {
    name: "default",
    size: size,
    nodeCount: nodeCount,
  },
});

export const kubeconfig = cluster.kubeConfigs[0].rawConfig;

package com.lalaolemur.blockblock;

/** Pure timing policy, independent of ad loading, consent and Activity state. */
public final class AdCadence {
 private AdCadence() {}
 public static boolean eligible(int newCompletions,long now,long lastFullScreenAt){
  return newCompletions>0&&newCompletions%5==0&&(lastFullScreenAt==0||now-lastFullScreenAt>=120000);
 }
}

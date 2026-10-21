package com.lalaolemur.blockblock;

/** Product quantities are owned by the app, never supplied by web content or prices. */
public final class TipCatalog {
 public static final String[] IDS={"tips_1","tips_5","tips_10","tips_20","tips_30","tips_40","tips_50"};
 private static final int[] COUNTS={1,5,10,20,30,40,50};
 public static int count(String id){for(int i=0;i<IDS.length;i++)if(IDS[i].equals(id))return COUNTS[i];return 0;}
 public static int grant(String id,int quantity,int balance){
  int count=count(id);
  if(count==0||quantity<1||balance<0)throw new IllegalArgumentException("Invalid Tip purchase");
  return Math.addExact(balance,Math.multiplyExact(count,quantity));
 }
 private TipCatalog(){}
}

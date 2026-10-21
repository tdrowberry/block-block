import com.lalaolemur.blockblock.TipCatalog;
public class TipCatalogTest {
 public static void main(String[] args){
  int[] expected={1,5,10,20,30,40,50};
  for(int i=0;i<expected.length;i++){
   check(TipCatalog.count(TipCatalog.IDS[i])==expected[i],"pack quantity");
   check(TipCatalog.grant(TipCatalog.IDS[i],1,7)==7+expected[i],"single grant");
   check(TipCatalog.grant(TipCatalog.IDS[i],2,7)==7+expected[i]*2,"purchase quantity");
  }
  check(TipCatalog.count("tips_500")==0,"unknown product");
  rejected(()->TipCatalog.grant("tips_500",1,0));
  rejected(()->TipCatalog.grant("tips_1",0,0));
  rejected(()->TipCatalog.grant("tips_1",-1,0));
  rejected(()->TipCatalog.grant("tips_50",1,Integer.MAX_VALUE));
  rejected(()->TipCatalog.grant("tips_50",Integer.MAX_VALUE,0));
  rejected(()->TipCatalog.grant("tips_1",1,-1));
  System.out.println("28 Tip catalog checks passed");
 }
 static void check(boolean passed,String message){if(!passed)throw new AssertionError(message);}
 static void rejected(Runnable action){try{action.run();throw new AssertionError("invalid purchase accepted");}catch(IllegalArgumentException|ArithmeticException expected){}}
}

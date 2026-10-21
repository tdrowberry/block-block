import com.lalaolemur.blockblock.AdCadence;
public class AdCadenceTest {
 public static void main(String[] args){
  for(int n=0;n<=100;n++)check(AdCadence.eligible(n,300000,0)==(n>0&&n%5==0),"cadence "+n);
  check(!AdCadence.eligible(5,300000,299000),"recent rewarded ad suppresses interstitial");
  check(!AdCadence.eligible(10,300000,180001),"cooldown boundary");
  check(AdCadence.eligible(10,300000,180000),"cooldown elapsed");
  check(AdCadence.eligible(5,1000,0),"first ad does not depend on device uptime");
  System.out.println("105 ad cadence checks passed");
 }
 static void check(boolean value,String message){if(!value)throw new AssertionError(message);}
}

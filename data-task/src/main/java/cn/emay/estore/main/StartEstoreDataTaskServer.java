package cn.emay.estore.main;

import java.io.IOException;

import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * 启动
 *
 */
public class StartEstoreDataTaskServer {
	boolean start = false;

	public static void main(String[] args) {
		try {
			@SuppressWarnings("resource")
			ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] { "/spring-context.xml" });
			context.start();

			StartEstoreDataTaskServer test = new StartEstoreDataTaskServer();
			test.start = true;
			test.startMainThread();

			System.in.read();

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public void startMainThread() {
		new Thread() {
			public synchronized void run() {
				while (start) {
					try {
						this.wait(5000l);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			};
		}.start();
	}
}
